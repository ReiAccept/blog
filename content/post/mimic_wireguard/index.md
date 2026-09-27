---
title: "使用 mimic + WireGuard 组网"
date: 2026-09-13T10:30:00+08:00
math: true
slug: "mimic_wireguard"
tags: ["Infra"]
lastmod: 2026-09-27T23:45:00+08:00
---

将一台鹅云轻量和一台瓦工中, 通过 mimic 传输进行 WireGuard 组网

原来我是用 Phantun 的, 前两天听一个群友在研究这个, 也想玩一下

2026-09-27 更新

把 p330 从"经 mimic 连鹅云"改成了**两条独立隧道**: 直连鹅云(不走 mimic) + 经 mimic 连瓦工。见文末《p330 改直连鹅云, 另开一条到瓦工》。顺带把上次没挖到底的 MTU 坑挖穿了, 见最后一节 —— 上次那个"开销 108 / 16 字节 padding"的推测**是错的**。

2026-09-26 更新

把家里的 p330 也接进来了, 见文末《把家里的机器也接进来》。顺手给上面那张拓扑表补了一列。

------

## 拓扑与地址规划

| 项目 |鹅云| 瓦工 | 本地 p330 |
|---|---|---|---|
| 系统 | Debian 13 (trixie), kernel 6.12.107 | Debian 13 (trixie), kernel 6.12.107 | Debian 13 (trixie), kernel 6.12.107 |
| 虚拟化 | KVM / virtio_net | KVM | 物理机 / Intel e1000e |
| 网卡可见地址 | `10.0.X.X/22`（NAT 后） | `真实公网地址` | `家宽内网地址`（PPPoE, 外层 MTU 1492） |
| WireGuard 地址 | `192.168.X.1/24`（wg0）+ `192.168.X.1/32`（wg1） | `192.168.X.2/24` | `192.168.X.3/32`（两条隧道共用） |
| 监听端口 | 51820（mimic）+ 51821（直连） | 51820 | 51820（mimic 到瓦工）+ 51821（直连鹅云） |
| mimic 过滤条件 | `local=鹅云内网IP:51820` | `local=真实公网地址:51820` | `remote=瓦工IP:51820` |

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
| 角色 | hub | 海外hub | 家用服务器 |
| 网络位置 | 公网 EIP, 网卡上是内网地址 | 真实公网 IP | 家宽 NAT 后, **PPPoE** |
| 网卡 | virtio_net | — | Intel **e1000e** (其实还插了个82599ES, 但是这块卡不用来走这条路线)|
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

### 鹅云侧

之前在鹅云的 filter 写的是

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

WireGuard 那边暂时用 live 的方式加 peer, 不重启接口，家宽后也没有什么 Endpoint 好写:

```
# wg set wg0 peer <p330公钥> allowed-ips 192.168.X.3/32
```

### 瓦工侧

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

一旦 DHCP 换了地址, mimic 就匹配不上任何包 —— 隧道"看起来还在", 但混淆其实已经失效了。

所以客户端这边按**对端**匹配:

```ini
filter = remote=鹅云EIP:51820
```

这样跟本机地址无关。man page 里 `stale` 参数的说明也是围绕 `remote` filter 描述"客户端本地端口变化"的场景, 算是官方暗示了这种用法。

但是话又说回来了, 家里到鹅云感觉直接跑wg就行了……一共6M带宽, 运营商也 QoS 不到哪里去

#### e1000e 网卡必须 `xdp_mode = skb`

上次鹅云是因为 virtio_net 才用的 skb。这次 p330 是**物理机, Intel e1000e**, 正好也在 mimic 文档点名的那份"原生 XDP 可能不稳定"的驱动列表里 (e1000/e1000e/igb/igc)。

所以直接写 `xdp_mode = skb`, 生效后 `ip link show eno1` 能看到 `xdpgeneric`:

```
2: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 xdpgeneric ...
    prog/xdp id 200 name ingress_handler tag 394bf6a8d35f24d3 jited
```

#### MTU

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

下行那 676 次重传和上次的现象一致 —— 6 Mbps 出口被打满时, mimic 伪造的 TCP 会大量重传 (上次 `max_window` 没开的时候是 1525)。

---

## p330 改直连鹅云, 另开一条到瓦工

2026-09-27 更新

上次 p330 是**经 mimic 连鹅云**, 去瓦工靠鹅云中转。这样有两个问题:

1. RTT 白涨: p330→瓦工 148 ms = p330→鹅云 18 ms + 鹅云→瓦工 130 ms, 中间那一跳纯属绕路
2. 去瓦工的流量得过鹅云那 6 Mbps 出口, 直接被卡死

所以拆成两条独立隧道:

- wg0 **直连鹅云**, 不走 mimic
- wg1 经 **mimic 连瓦工**

### 鹅云的第二个接口

换个端口就完事, mimic 一行都不用改

`/etc/wireguard/wg1.conf`:

```ini
[Interface]
Address = 192.168.X.1/32
ListenPort = 51821
PrivateKey = 不告诉你
MTU = 1420

[Peer]
# p330 (NAT 后, 不设 Endpoint, 靠对端保活)
PublicKey = 不告诉你
AllowedIPs = 192.168.X.3/32
```

MTU 用标准的 **1420** 而不是 1380 —— 这条隧道没有 mimic 那 72 字节开销 (见文末 MTU 那节), 标准值就能跑满。

nftables 补两行:

```nft
iifname "wg1" accept
udp dport 51821 accept # 这里**只需要放行 UDP**, 不像 mimic 隧道那样 TCP/UDP 都得写。
```

### p330: 两条隧道共用一个 IP, 必须改成 /32

p330 两条隧道都用 `192.168.X.3`。这里有个**必须改**的地方: wg0 原来是 `/24`, 现在得改成 `/32`。

因为 `/24` 会在 p330 上生成一条 `192.168.X.0/24 dev wg0` 的**子网路由**, 两条隧道会抢整段 —— 去瓦工的流量会被塞进连鹅云的那条。

改成 `/32` 之后, 每条隧道只按对端的 /32 主机路由转发:

```
# ip route get 192.168.X.1
192.168.X.1 dev wg0 src 192.168.X.3     # 直连鹅云
# ip route get 192.168.X.2
192.168.X.2 dev wg1 src 192.168.X.3     # 经 mimic 到瓦工
```

两个接口扛同一个 /32 地址是没问题的, 因为源地址恒为 `.3`, 不存在选择歧义。

`/etc/wireguard/wg0.conf` (直连鹅云):

```ini
[Interface]
Address = 192.168.X.3/32
ListenPort = 51821
PrivateKey = 不告诉你
MTU = 1420

[Peer]
PublicKey = 不告诉你
AllowedIPs = 192.168.X.1/32
Endpoint = 鹅云EIP:51821
PersistentKeepalive = 25
```

`/etc/wireguard/wg1.conf` (mimic 连瓦工):

```ini
[Interface]
Address = 192.168.X.3/32
ListenPort = 51820
PrivateKey = 不告诉你
MTU = 1380

[Peer]
PublicKey = 不告诉你
AllowedIPs = 192.168.X.2/32
Endpoint = 瓦工IP:51820
PersistentKeepalive = 25
```

mimic 过滤器跟着改成指向瓦工:

```ini
filter = remote=瓦工IP:51820
```

### 瓦工

加一个新 peer:

```ini
[Peer]
PublicKey = p330 的公钥
AllowedIPs = 192.168.X.3/32
```

WireGuard 的 allowed-ips 是**最长前缀优先**: 去 `.3` 命中 /32 走 p330 直连, 去 `.4` 还是走 /24 经鹅云。

加 peer 用热加载, 不重启接口 (当时瓦工↔鹅云正在传数据):

```
# wg set wg0 peer <p330公钥> allowed-ips 192.168.X.3/32
```

同时写进 `/etc/wireguard/wg0.conf`, 保证重启后还在。


### 验证

| 路径 | 方式 | RTT |
|---|---|---|
| p330 → 鹅云 | 直连, 明文 UDP | **13 ms** |
| p330 → 瓦工 | mimic, 混淆成 TCP | **139 ms** |
| (上次) p330 → 瓦工, 绕鹅云 | | 148 ms |

抓包确认两条隧道行为

```
--- 到鹅云 :51821 (期望 UDP) ---
IP 家宽内网地址.51821 > 鹅云EIP.51821: UDP, length 128          ← 明文 ✓

--- 到瓦工 :51820 (期望 TCP) ---
IP 家宽内网地址.51820 > 瓦工IP.51820: Flags [.], win 65535, length 128    ← 混淆 ✓
```

`win 65535` 说明 `max_window` 生效了。两条隧道都做了满包 DF 探测 + 真实 HTTP 请求 (200 / 301), 排除了 MTU 黑洞。

---

## MTU 那个坑: 这次把它挖到底了

上次留了个尾巴:

> 外层 1492 − 内层 1424 = **68 字节**开销。按 "mimic +12、TCP 头 20、IP 头 20" 算是 52, 对不上, 中间差 16。大概率是 WireGuard 自己按 16 字节对齐 padding

**这次实测把上面两个推测都否掉了。**

### 开销恒为 72 字节, 而且没有 padding

直接在鹅云出口抓包, 量已知内层大小的包:

| 内层 IP | 外层 TCP IP |
|---|---|
| 1392 | **1464** |
| 1400 | **1472** |

差值恒为 **72**。而且内层 1400 发出去的就是 1472, **不是 1480** —— 说明 **WireGuard 并没有做 16 字节对齐 padding**。

72 这个数怎么来的: **WG 头 32 + TCP 头 20 + IP 头 20**。

> 上次那个 "mimic +12" 是**重复计算**了 —— 那个 12 是 UDP 头(8) 换成 TCP 头(20) 的**差值**, 不是额外加的一项。把它和"TCP 头 20"一起算, 就把头算了两遍。

### 限制不在路径 MTU 上, 而是 TCP 特有的

逐字节探边界:

| 内层 IP | 外层 TCP IP | 结果 |
|---|---|---|
| 1392 | **1464** | 通 |
| 1393 | **1465** | **不通** |

外层卡在 1464。

可是同一条路径:

- **ICMP**: 两个方向都能过 **1500** (1504 才失败)
- **UDP**: 从鹅云打向瓦工, 载荷 1472 (IP 1500) **0% 丢包**

也就是说 **路径对 UDP/ICMP 是 1500, 对 mimic 的 TCP 却卡在 1464**。这不是 MTU 问题, 是**针对 TCP 的**限制。

### 两个方向的上限还不一样

反方向 (瓦工→鹅云) 再测:

| 内层 IP | 外层 TCP IP | 结果 |
|---|---|---|
| 1424 | 1496 | 通 |
| 1440 | 1512 | 不通 |

1512 > 1500, 这个失败**就是路径 MTU 本身**; 而 1496 能过。

所以:

- 鹅云 → 瓦工: 上限 **1464**
- 瓦工 → 鹅云: 上限 **1496** (受路径 MTU 约束)

**两个方向根本不是同一个机制。**

(顺带一提, 中间点 1472 测到过一次 25% 丢包, 样本太小, 可能只是抖动, 没有深究。)

### 1464 这个数 —— 抓到握手包之后就清楚了

先说数据: 1464 = **1424 + 20 + 20**。而 1424 这个数在 `mimic show` 里出现过:

```
# 瓦工上
Connection 瓦工IP:51820 => 鹅云EIP:51820
  Peer MSS: 1424          ← 瓦工认为鹅云通告的
Connection 瓦工IP:51820 => 家宽公网IP:51820
  Peer MSS: 1452          ← 瓦工认为 p330 通告的

# 鹅云上
Connection 鹅云内网IP:51820 => 瓦工IP:51820
  Peer MSS: 1332          ← 鹅云认为瓦工通告的
```

上次只能写"这个巧合很可疑"。这次**直接把握手包抓下来了** —— 在鹅云重启 mimic 触发一次新握手, 抓到的 SYN:

```
10.0.16.6.51820 > 220.185.230.26.37135: Flags [S], win 65535,
    options [mss 1460, nop,wscale 14,nop,nop,sackOK], length 0
```

**mimic 通告的 MSS 是 1460** —— 1500 MTU 下的标准值, 本身完全正常。

可是瓦工那边收到的是 **1424**:

```
1460 − 1424 = 36 字节
```

**中间有设备在握手路径上把 MSS 改写掉了, 砍了 36 字节。** 然后按这个值丢弃超长段 —— 于是外层上限 = 1424 + 20 + 20 = **1464**, 和实测边界严丝合缝。

这也解释了为什么**反方向没这个现象**: 两个方向走的中间设备和策略不一样, 一边做了钳制, 一边没做。


### 所以结论是

- **mimic 开销恒定 72 字节**, 算隧道 MTU 就是 `内层上限 = 外层 TCP 上限 − 72`
- 但**外层 TCP 上限 ≠ ICMP 测出来的路径 MTU**, 而且**跟方向、跟链路都有关**。拿 `ping -M do` 测出来的数去推隧道 MTU 是不准的
- 上次在 p330 链路上测到的 1424, 按 72 字节算外层是 **1496**, 而当时 ICMP 测出来的路径 MTU 是 1492 —— **TCP 反而比 ICMP 多过去了 4 个字节**, 和这次在瓦工→鹅云方向看到的现象一致
- **1380 这个取值依然是对的**: 在最紧的那条链路 (上限 1392) 上留了 12 字节余量

> **实践建议**: 部署完 mimic 之后, 唯一可靠的办法是**在隧道里发满包实测**

---

## 附: 一个操作上的坑 —— 别单侧重启 mimic

这个地方我自己其实也没特别搞懂，因为时间很短，属于随便猜一下，主要是复述一下现象

重启鹅云的 mimic 抓到的SYN 包。抓完发现: 瓦工几秒内自己恢复了, 但 **.4 家宽的 P330 设备直接断了**, 而且**不会?自愈**（感觉也不是, 不太容易自愈

盲猜的原因: **mimic 的连接状态是两端的, 单侧重启只清掉一半。**

- 鹅云重启 → 忘了这条连接, 于是主动发 SYN 想重建
- .4 没重启 → 它那边仍认为连接是 Established, 收到 SYN 也不理会, 继续按老连接发数据
- 鹅云在 `SYN_SENT` 状态收到数据包 → 判定 `invalid TCP state` → 回 RST → 销毁重试

日志里就是这个循环:

```
Info  :: initializing connection
Warn  :: connection destroyed (invalid TCP state), retry in 10 seconds
Warn  :: connection destroyed (invalid TCP state), retry in 10 seconds
...
```

**超时不会自愈** mimic 的 keepalive / `stale` 超时都以"对端无活动"为前提, 而鹅云一直在发 SYN/RST —— 对 .4 来说这**一直算"有对端活动"**, 超时永远不触发。死锁。

感觉最后是运气好: .4 的 NAT 出口端口正好换了 (37135 → 45733), 新五元组被 mimic 当成一条全新连接, 直接建起来, 把旧的那条晾在一边变成 `Idle`。

正确做法:

- **要重启就两端一起重启**, 别只动一边
- 实在只能动一边, 就把对端也准备好 —— 要么能重启它, 要么接受它断到 NAT 端口变化 / 连接被回收为止
- 单侧重启后如果对端是**公网直连**, 通常能自己恢复(瓦工就是这样); 对端在 **NAT 后面**就很容易死锁(.4 就是这样)

