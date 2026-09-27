---
title: "使用 mimic + WireGuard 组网"
date: 2026-09-13T10:30:00+08:00
math: true
slug: "mimic_wireguard"
tags: ["Infra"]
lastmod: 2026-09-26T22:40:00+08:00
---

将一台鹅云轻量和一台瓦工中, 通过 mimic 传输进行 WireGuard 组网

原来我是用 Phantun 的, 前两天听一个群友在研究这个, 也想玩一下

2026-09-26 更新

把家里的 p330 也接进来了, 见文末《把家里的机器也接进来》。顺手给上面那张拓扑表补了一列。

------

## 拓扑与地址规划

| 项目 |鹅云| 瓦工 | 本地 p330 |
|---|---|---|---|
| 系统 | Debian 13 (trixie), kernel 6.12.107 | Debian 13 (trixie), kernel 6.12.107 | Debian 13 (trixie), kernel 6.12.107 |
| 虚拟化 | KVM / virtio_net | KVM | 物理机 / Intel e1000e |
| 网卡可见地址 | `10.0.X.X/22`（NAT 后） | `真实公网地址` | `家宽内网地址`（PPPoE, 外层 MTU 1492） |
| WireGuard 地址 | `192.168.X.1/24` | `192.168.X.2/24` | `192.168.X.3/24` |
| 监听端口 | 51820 | 51820 | 51820 |
| mimic 过滤条件 | `local=鹅云内网IP:51820` | `local=真实公网地址:51820` | `remote=鹅云EIP:51820` |

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

---

## 把家里的机器也接进来

前几天把家里的 p330 也接进了这个网, 分配 `192.168.X.3`。

### 三台机器最终长这样

上面那张表已经同步过了, 关键差异在这里:

| | 鹅云 | 瓦工 | 本地 p330 |
|---|---|---|---|
| 角色 | hub | 对端 | 对端 |
| 网络位置 | 公网 EIP, 网卡上是内网地址 | 真实公网 IP | 家宽 NAT 后, **PPPoE** |
| 网卡 | virtio_net | — | Intel **e1000e** |
| XDP 模式 | `skb` | `skb` | `skb` |
| mimic filter | `local=` 本机地址 | `local=` 本机地址 | **`remote=` 对端地址** |

### p330 侧

`/etc/wireguard/wg0.conf`

```ini
[Interface]
Address = 192.168.X.3/24
ListenPort = 51820
PrivateKey = 不告诉你
MTU = 1380

[Peer]
PublicKey = 不告诉你
AllowedIPs = 192.168.X.0/24
Endpoint = 鹅云EIP:51820
PersistentKeepalive = 25
```

`/etc/mimic/eno1.conf`

```ini
log.verbosity = info
link_type = eth
xdp_mode = skb
max_window = true
filter = remote=鹅云EIP:51820
```

装包:

```
# apt install wireguard linux-headers-$(uname -r) mimic mimic-dkms
```

trixie 仓库里的 `mimic` 是 `0.7.0+ds-2`, 和鹅云上跑的**是同一个版本**, 省得担心两边的 wire format 对不上。

### 鹅云侧: mimic 配置一个字都没改

这是这次最省事的地方。鹅云的 filter 写的是

```ini
filter = local=内网地址:51820
```

它匹配的是"**本机**地址 + 端口", 跟对端是谁**无关** —— 所以加第二个 peer 时, 这条 filter 天然就覆盖了新连接, 一行都不用动。

`mimic show -c eth0` 也确实直接变成两条:

```
Connection 10.0.X.X:51820 => 瓦工IP:51820
  State: Established
  Peer MSS: 1332

Connection 10.0.X.X:51820 => 家宽公网IP:3102
  State: Established
  Peer MSS: 1424
```

WireGuard 那边用 live 的方式加 peer, **不重启接口**:

```
# wg set wg0 peer <p330公钥> allowed-ips 192.168.X.3/32
```

注意**没写 `Endpoint`** —— p330 在 NAT 后, 让鹅云从入向握手自己学就行; 写了反而会让鹅云主动去连一个 NAT 地址。

### 瓦工侧: 只放宽一条

要让 p330 能访问瓦工, 得把瓦工上"鹅云"这个 peer 的 AllowedIPs 从 `/32` 放宽:

```ini
AllowedIPs = 192.168.X.0/24   # 原来是 192.168.X.1/32
```

`/32` 会同时卡住两件事: 不放行源地址是 `.3` 的包, 也不把去 `.3` 的回程路由进隧道。

### 这次踩到的坑


#### 客户端在 NAT 后, filter 要写 `remote=` 而不是 `local=`

鹅云和瓦工两边一个是固定内网地址、一个是公网地址, 所以上次两边都写 `local=`。但 p330 的地址是 DHCP 分的:

```ini
filter = local=家宽内网地址:51820   # 租约一变就静默失效
```

一旦 DHCP 换了地址, mimic 就匹配不上任何包 —— 隧道"看起来还在", 但混淆其实已经失效了。**这种失败不报错, 最难查。**

所以客户端这边按**对端**匹配:

```ini
filter = remote=鹅云EIP:51820
```

这样跟本机地址无关。man page 里 `stale` 参数的说明也是围绕 `remote` filter 描述"客户端本地端口变化"的场景, 算是官方暗示了这种用法。

#### e1000e 网卡必须 `xdp_mode = skb`

上次鹅云是因为 virtio_net 才用的 skb。这次 p330 是**物理机, Intel e1000e**, 正好也在 mimic 文档点名的那份"原生 XDP 可能不稳定"的驱动列表里 (e1000/e1000e/igb/igc)。

所以直接写 `xdp_mode = skb`, 生效后 `ip link show eno1` 能看到 `xdpgeneric`:

```
2: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 xdpgeneric ...
    prog/xdp id 200 name ingress_handler tag 394bf6a8d35f24d3 jited
```

#### MTU: 上次的 1392 不是个通用常数

上次在这条 `鹅云↔瓦工` 链路上测出来的最大内层 MTU 是 **1392**, 当时还推测了一通"mimic 的 TCP 头带选项"云云。这次在 p330 这条链路上重新做 DF 位探测, 结果对不上。

先测外层路径本身 (直接 ping EIP, 不经隧道):

| 外层 IP 包 | 结果 |
|---|---|
| 1492 |  通 |
| **1493** |  **不通** |

**家宽是 PPPoE, 外层 MTU 是 1492 而不是 1500。**

再临时把 p330 的 wg0 MTU 调大, 在隧道内测:

| 内层 IP 包 | 结果 |
|---|---|
| 1424 |  通 |
| **1425** |  **不通** |

**这条链路的最大可用内层 MTU = 1424**, 比上次那条链路的 1392 **高了 32 字节**。也就是说:

> **mimic 的 MTU 上限不是一个"多少字节"的固有属性, 它跟着外层路径 MTU 走。** 外网路径一变 (1500 → PPPoE 1492), 这个数就跟着变。

上次那句"务必 DF 位探测实测"依然成立, 但结论不能照抄。

有个细节我还没完全想明白: 外层 1492 − 内层 1424 = **68 字节**开销。按"mimic +12、TCP 头 20、IP 头 20"算是 52, 对不上, 中间差 16。大概率是 WireGuard 自己按 16 字节对齐 padding、或者 mimic 那个 fragment 的排布在起作用。总之实测值说话。

**最终仍然用 1380, 没有跟着调到 1424。** 原因是 wg0 的 MTU 是 **per-interface** 的, 一个接口上所有 peer 共用一个值 —— 鹅云那边 wg0 已经是 1380, 而且 `鹅云↔瓦工` 那条链路的上限本来就是 1392。单独把 p330 调到 1424 就变成非对称 MTU, 迟早出问题。1380 在这条链路上留了 44 字节余量, 够用。


### 这次的验证结果

#### 连通性

三方两两互通。从 p330 出发:

```
# ping -c 4 192.168.X.1          # 鹅云
4 packets transmitted, 4 received, 0% packet loss
rtt min/avg/max/mdev = 17.366/17.830/18.312/0.334 ms

# ping -c 4 192.168.X.2          # 瓦工
4 packets transmitted, 4 received, 0% packet loss
rtt min/avg/max/mdev = 148.251/148.379/148.493/0.086 ms
```

p330→瓦工 的 148 ms ≈ p330→鹅云 的 18 ms + 鹅云→瓦工 的 130 ms, 和上次测的 130 ms 对得上。从瓦工 traceroute 也确认是绕鹅云过去的:

```
# traceroute -n 192.168.X.3
 1  192.168.X.1  130.639 ms
 2  192.168.X.3  148.209 ms
```

#### mimic 效果

p330 的 `mimic show -c eno1`:

```
Connection 家宽内网地址:51820 => 鹅云EIP:51820
  State: Established
  Peer MSS: 1424
```

在 p330 的 eno1 上抓包, 出口 TCP / 入口 UDP 的分裂现象和上次完全一致:

```
--- TCP, 17 个 ---
IP 家宽内网地址.51820 > 鹅云EIP.51820: Flags [.], win 65535, length 128
--- UDP, 16 个 ---
IP 鹅云EIP.51820 > 家宽内网地址.51820: UDP, length 128
```

`win 65535` 说明 `max_window = true` 也生效了。

#### 吞吐

| 方向 | 吞吐 | 说明 |
|---|---|---|
| p330 → 鹅云 | 88.0 Mbps | 跑的是家宽上行, 重传 79 |
| 鹅云 → p330 | 5.77 Mbps | 6 Mbps 出口跑满了, 重传 676 |

下行那 676 次重传和上次的现象一致 —— 6 Mbps 出口被打满时, mimic 伪造的 TCP 会大量重传 (上次 `max_window` 没开的时候是 1525)。家宽这边上行有 88 Mbps, 但只要是**经过鹅云出口**的方向, 就都卡在那 6 Mbps 上。

