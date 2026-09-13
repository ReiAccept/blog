---
title: "使用 mimic + WireGuard 组网"
date: 2026-09-13T10:30:00+08:00
math: true
slug: "mimic_wireguard"
tags: ["Infra"]
---

将一台鹅云轻量和一台瓦工中, 通过 mimic 传输进行 WireGuard 组网

原来我是用 Phantun 的, 前两天听一个群友在研究这个, 也想玩一下


## 拓扑与地址规划

| 项目 |鹅云| 瓦工 |
|---|---|---|
| 系统 | Debian 13 (trixie), kernel 6.12.107 | Debian 13 (trixie), kernel 6.12.107 |
| 虚拟化 | KVM / virtio_net | KVM |
| 网卡可见地址 | `10.0.X.X/22`（NAT 后） | `真实公网地址` |
| WireGuard 地址 | `192.168.X.1/24` | `192.168.X.2/24` |
| 监听端口 | 51820 | 51820 |
| mimic 过滤条件 | `local=鹅云内网IP:51820` | `local=真实公网地址:51820` |

---


## 配置

### `/etc/wireguard/wg0.conf`

**鹅云**
```ini
[Interface]
Address = 192.168.X.1/24
ListenPort = 51820
PrivateKey = 不告诉你
MTU = 1380

[Peer]
PublicKey = 不告诉你
AllowedIPs = 192.168.X.2/32
Endpoint = 瓦工IP:51820
PersistentKeepalive = 25
```

**瓦工**
```ini
[Interface]
Address = 192.168.X.2/24
ListenPort = 51820
PrivateKey = 不告诉你
MTU = 1380

[Peer]
PublicKey = 不告诉你
AllowedIPs = 192.168.X.1/32
Endpoint = 鹅云EIP:51820
PersistentKeepalive = 25
```

### `/etc/mimic/eth0.conf`

**鹅云**
```ini
log.verbosity = info
link_type = eth
xdp_mode = skb
max_window = true
filter = local=内网地址:51820
```

**瓦工**
```ini
log.verbosity = info
link_type = eth
xdp_mode = skb
max_window = true
filter = local=公网地址:51820
```

### nftables

**鹅云** — `/etc/nftables.conf`
```nft
#!/usr/sbin/nft -f
flush ruleset

table inet filter {
    chain input {
        type filter hook input priority filter; policy drop;
        ct state vmap { established : accept, related : accept, invalid : drop }
        meta l4proto { icmp, ipv6-icmp } counter accept
        iifname lo accept
        iifname "wg0" accept
        tcp dport 22 accept
        tcp dport 51820 accept
        udp dport 51820 accept
    }
    chain forward { type filter hook forward priority filter; policy drop; }
    chain output  { type filter hook output  priority filter; policy accept; }
}
```

**瓦工** — 这台机器是老机器, 所以追加这几行就好了
```nft
        iifname "wg0" accept
        tcp dport { 51820 } accept
        udp dport { 51820 } accept
```

---

## 踩到的坑

### mimic 配置文件的 `filter` 只接受**一个** origin

GitHub master 分支的 man page 写的是 `{origin}={ip}:{port}`，并举例可追加覆盖项，容易让人以为能写：

```ini
filter = local=鹅云内网IP:51820,remote=瓦工IP:51820   # 0.7.0 报错
```

实际 0.7.0 会直接拒绝：
```
Error unsupported option type: 'remote'
Error failed to read configuration file
```

逗号后面只能跟 `padding` / `handshake` / `keepalive` 这类**覆盖项**，不能跟第二个 origin。

```ini
filter = local=鹅云内网IP:51820
```

### NAT

鹅云的 mimic 过滤器必须写**内网地址**，而不是 鹅提供的EIP。因为 eBPF 挂在 TC/XDP 上，看到的是 NAT 转换前的包。

### MTU：文档推荐的 1408 在这个环境下是硬黑洞

mimic 官方文档推荐的隧道 MTU 是 1408，但在本环境中 **1408 是硬黑洞（100% 丢包）**。实测最大可用值为 1392，最终采用了个 1380, 我到现在还没彻底明白这个坑是怎么来的

mimic 文档给出的算法是"在 WireGuard MTU 基础上减 12"：以太网 1500 → WireGuard 1420 → mimic 1408。按此配置后现象是：

- **小包正常**：ping 通、TCP 三次握手成功
- **大包全丢**：iperf3 显示 `0.00 Bytes`、大量重传，随后 `Connection refused`
- 典型 MTU 黑洞（PMTUD 失效）特征

实测 DF 位探测（内层 IP 包大小 vs 连通性）：

| 内层 IP 包 | 结果 |
|---|---|
| 1380 |  通 |
| 1392 |  通 |
| **1393** |  **不通** |
| 1400 / 1408 |  不通 |

**最大可用内层 MTU = 1392**。最终取 **1380**，留 12 字节安全余量（防 mimic 在特定情况下追加 TCP 选项导致外层包变大）。

排除掉的其它可能性：
-  公网基线路径 MTU 实测为 **1500**（`ping -M do -s 1472` 成功），排除腾讯云 overlay 封装
-  切换 XDP 模式无改善，排除 eBPF 处理问题
-  双向均验证（瓦工→鹅云在 MTU 1380 下大包也全通）

推测原因为 mimic 生成的 TCP 报文头带选项（时间戳/SACK/窗口缩放等），使外层 TCP 头达到约 40+ 字节而非 20 字节，实际每包开销约 108 字节而非文档所述的 74 字节，故上限落在 1392 而非 1416。

> **实践建议**：任何环境部署 mimic 后，**务必用 DF 位探测实测 MTU 边界**，不要直接套用文档的 1408。

### XDP native 模式在 virtio_net 上触发连接中断

鹅云是 KVM + virtio_net 网卡。mimic 以默认的 **native** 模式挂载 XDP 的**瞬间**，当前 SSH 会话被 RST（`kex_exchange_identification: read: Connection reset by peer`），但 ICMP 与重建连接均正常。

这与文档中提示的 [issue #11](https://github.com/hack3ric/mimic/issues/11) 现象一致——部分宿主机阻断 guest 的 virtio_net native XDP。按文档建议改用：

```ini
xdp_mode = skb
```

由于鹅云出口带宽只有 6 Mbps，skb 模式相对 native 的性能损失（generic XDP 走 skb 路径）完全无关紧要*

### `max_window` 显著降低重传

mimic 伪造的 TCP 默认窗口约 13 KB。鹅云↔瓦工 的 RTT 是 130 ms，`13 KB / 130 ms ≈ 0.8 Mbps`，在高 RTT 链路上窗口会成为瓶颈并引发大量重传。

开启后（两端都要开）：

```ini
max_window = true
```

重传次数实测从 **1525 降到 102**（同样 6 Mbps 饱和链路、6~8 秒测试）。抓包可见窗口变为 `win 65535`。

### 防火墙必须同时放行 TCP 和 UDP

mimic 的透明改写发生在 eBPF 层，netfilter 在不同方向看到的东西不一样：

| 观测点 | 看到的协议 |
|---|---|
| 出口方向（TC 在 netfilter OUTPUT **之后**执行） | **UDP** |
| 入口方向（XDP 在 netfilter INPUT **之前**执行，已还原） | **UDP** |
| 链路中间的真实抓包 | **TCP**（出口） |

所以规则必须两条都写，缺一不可：

```nft
tcp dport 51820 accept
udp dport 51820 accept
```

实测抓包证据（鹅云的 eth0）：
```
出: IP 鹅云内网IP.51820 > 瓦工IP.51820: Flags [.], win 65535, length 128   ← TCP
入: IP 瓦工IP.51820 > 鹅云内网IP.51820: UDP, length 128                    ← UDP
```

## 验证结果

### 连通性

```
$ ping -c 4 192.168.X.2          # 从 鹅云
4 packets transmitted, 4 received, 0% packet loss
rtt min/avg/max/mdev = 130.352/163.151/261.358/56.699 ms
```

### mimic 效果

鹅云的 `mimic show -c eth0`：
```
Connection 鹅云内网IP:51820 => 瓦工IP:51820
  State: Established
  Peer MSS: 1332
```

抓包证明出口全部为 TCP、UDP 捕获数为 0：
```
--- TCP 51820 ---
IP 鹅云内网IP.51820 > 瓦工IP.51820: Flags [.], win 65535, length 128
--- UDP 51820 ---
0 packets captured
```

### 吞吐

| 方向 | 吞吐 | 说明 |
|---|---|---|
|鹅云→ 瓦工 | 5.11 Mbps | 跑满了倒是, 本身带宽这么点大 |
| 瓦工 →鹅云| 102 Mbps |  |
