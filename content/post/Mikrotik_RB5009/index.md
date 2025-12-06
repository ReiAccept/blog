---
title: "MikroTik RB5009"
date: 2023-07-30T10:30:00+08:00
math: true
slug: "Mikrotik_RB5009"
# weight: 1
# aliases: ["/first"]
tags: ["寄术"]
categories: ["Hardware"]
# author: ["Me", "You"] # multiple authors
# showToc: true
# TocOpen: false
# draft: false
# hidemeta: false
# comments: false
description: "如果这玩意的配置是 2 个 SFP+ 和 8 个 2.5G RJ45 将是绝杀"
image: "pic.jpg"
---

在 Путин, Владимир Владимирович 搞事之前，RB5009 的价格一直是 12xx 软妹币……

然后……然后……这玩意就成理财产品了……

观望了好几年，这玩意的价格从 12xx -> 2xxx -> 13xx 虽然价格还是很高，但是还算可以接受

不过一个 10G SFP+ 一个 2.5G RJ45，剩下 7 个都是 1000M 口这种配置，MikroTik做出来属实有些膈应人了……

哦，背板带宽还跑不满

不过主要是 E3-1265Lv3 软路由实在是撑不起家里的网络了，不得不换一个

![包装盒](pic1.jpg)

![顶面](pic2.jpg)

![正面](pic3.jpg)

目前杭州租的房子里机架还没搞好，只能丢个袋子里挂起来，灵车的很

等下次回台州把猫棒什么都拿来，淘汰掉联通的垃圾光猫

![](pic4.jpg)


Tips: 如果您要将 RB5009 与 RTL960x 系列 SFP 猫棒协商 2.5G 速率

首先需要 SSH到猫棒上执行 `flash set LAN_SDS_MODE 6` 然后回到 winbox，关闭自动协商，设置速率为 2.5G baseX，然后需要等待第一次重协商的时间会比较长，[参考资料](https://github.com/Anime4000/RTL960x)