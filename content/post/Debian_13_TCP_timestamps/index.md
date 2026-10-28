---
title: "Debian 13 TCP Timestamps 导致 apt 连接被防火墙丢包 "
date: "2026-10-27T17:05:56+08:00"
description: "在公司更新手上的开发机遇到的牛魔问题"
tags: [随笔]
math: true
---

这两天在公司更新一台手上的开发机从 Debian 12 到 Debian 13

然后更新完成后发现 apt 连公司源的时候第一个请求是好的, 后续的请求就会直接卡住

这台设备之前在 Debian 12 的时候也是好的，手上另一台去年更新的 Debian 13 开发机是好的, 于是尝试将去年更新的那台 Debian 13 的机器也 apt upgrade 了一下后重启, 也出现了这个问题

然后就开始抓包排查, 看样子像是第一个请求的包都能正常到服务器, 但是后续第二个条连接的 SYN 直接被丢了

最怪的是, 偶尔是可以通的, 然后第三个连接又不通了

最开始以为是公司防火墙策略的问题, 但是想想也不对, 毕竟更新前好的, 更神秘的是另一台 Debian 更新之后也复现了问题

具体原因是这个改动 https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/commit/?id=5da5662181ef8a251e3ba564903002c2e87de452

这个改动是从主线 7.0 cherry pick 来修到 6.12.94 内核上的, 让 Timestamp Offset 的数值分布发生变化，使公司镜像源的服务器一直丢弃这个包

但是这个其实存在迷惑, 因为按照改动代码来看

- 旧的 TS Offset：32-bit 哈希结果。
- 新的 TS Offset：64-bit 哈希结果中的一个 32-bit 部分

两者的有效数值范围都是 0 到 $2^{32}−1$，即 0 到 4294967295, 按理来说变动是不大的

解决方法是配置 `/etc/sysctl.d/99-tcp-timestamps.conf`

```conf
# 这个值默认 1 启用 TCP 时间戳, 并为每个连接使用随机偏移量; 0 禁用; 2 启用但是不随机
net.ipv4.tcp_timestamps = 2
```

另外还搜到了一篇知乎的文章, 是2020年的, 和我这个2026年的 fix 无关, 但是原理上可能相同

https://zhuanlan.zhihu.com/p/145939529

这篇知乎文章和现在的区别是 tcp_tw_recycle 这个东西已经于2017年移除（上面 commit 链接也有提到）

接着检索互联网, 发现 Linux 网络开发邮件列表中，有一份专门讨论 tcp: secure_seq: add back ports to TS offset 的后续报告。它描述了 NAT 场景下的 TCP Timestamp Offset 回归问题，而且报告者发现，将客户端设置为 tcp_timestamps=2 可以恢复正常。

https://lists.openwall.net/netdev/2026/06/11/29

时间是 2026 年的, 较近期

结合两篇文章和自己抓包, 盲猜了一个问题发生步骤

1. Debian 13 根据本地四元组生成 Timestamp Offset：TS_OFFSET = hash(src_ip, dst_ip, src_port, dst_port)
2. 服务端复用旧连接的四元组,短连接关闭后，服务端可能仍然保留该四元组对应的 TIME_WAIT 状态。新的连接复用同一个外部端口时，如果新连接的 TSval 比旧连接的时间戳小，就可能触发 PAWS 相关检查
3. 最后丢包这一步是自己盲猜的, 因为未经流程申请对公司的防火墙做测试, 感觉上是被防火墙直接丢了 SYN, 或者服务端可能返回针对旧连接状态的 ACK，而不是预期的 SYN-ACK？


另外这个现象在另一位使用 Ubuntu 开发机的同事的设备上也复现了, Ubuntu 26.04 出现这个问题, 24.04 设备是好的, 也是同样的解决方法

且 Debian 12 的 timestamp 序列似乎是递增的？（但是这里不合理，因为net.ipv4.tcp_timestamps = 1 这个默认选项很早就存在了）

由于是在公司遇到这个问题, 工作时间直接被同事召唤解决其他问题去了, 暂时没空完整详细的探究这个问题发生的根源, 因此只先记录到现在这个程度