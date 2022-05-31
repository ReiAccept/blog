+++
title = "魔改华为 MA5671A 和 Nokia G-010S-A"
date = "2021-12-27T00:05:52+08:00"
tags = ["折腾"]
image = "G-010S-A.jpg"
slug = "mod_HUAWEI_MA5671A_and_Nokia_G_010S_A"
description = "2021年末的家庭网络折腾"
categories = ["buytrash"]
+++

2021-12-27 更新

这玩意现在在国内论坛已经烂大街了

------

事情的起因是因为上学期结束暑假回家的时候，移动给小区的用户设备升级，然后给我家的设备换成了菊花的 HS8145V5，虽然这款设备本身的性能没什么好黑的，比之前的光猫强多了，但是这玩意在我的弱电箱内占了很大一块地方让我很不爽来着，而且 WLAN SSID 强制带 CMCC

最无话可说的是，移动的人把我原来的软路由和AP直接拆了，麻了

暑假的时候训练，camp，帮孙老师上课（实际上大头是摸鱼）这一套下来都没空搞家里的网络，就一直咕到了寒假

然后给我有两个选择就是

1. 低成本方案：把华为的光猫刷回原版固件改桥接接入软路由，然后继续用（毕竟这玩意性能还凑合）
2. 硬件更换方案：换掉华为的光猫，直接在软路由上整 PON Stick，可以节约弱电箱的空间

最后还是选了方案2，HS8145V5 最大的问题是热。。虽然性能完全达标，但是真的很热，并且多一个设备让我的走线强迫症发作了

因此在瞎翻 OpenWRT 论坛和大黄鱼之后发现了神奇的洋垃圾模块 华为 MA5671A 和 Nokia G-010S-A （还有一个 G-010S-P）

![](taobao.png)

于是脑子一热下单 Intel 82599 和一个拆机的 G-010S-A 

为什么说是脑子一热呢

这个东西。。。完全不能在中文网站上搜到相关结果

并且没有提供 Datasheet ，Google 能找到相关资料的地方只有

[Will GPON Nokia G-010S-A change sn? - Hardware Questions and Recommendations - OpenWrt Forum](https://forum.openwrt.org/t/will-gpon-nokia-g-010s-a-change-sn/69602)

[Nokia G-010S-A Pin 6 Issue (rsaxvc.net)](https://rsaxvc.net/blog/2020/8/15/Nokia_G-010S-A_Pin_6_Issue.html)

[hwti/G-010S-A: All about Nokia G-010S-A GPON SFP (github.com)](https://github.com/hwti/G-010S-A)

并且买完才发现 G-010S-A 用的光缆是 APC （斜切，外观为绿色端子）（顺带一提，MA5671A 也是 APC）

而我家的入户光纤是 UPC （平切，外观为蓝色端子）的，靠谱起见大概我还需要去借一台熔纤机或者买个转接光纤这样

以及还有个坑点是，G-010S-A，G-010S-P，MA5671A 支持到2.5Gpbs 的 GPON，但是 Intel 82599 只提供 1Gpbs/10Gpbs 两种速率选择，也就是说，只能工作在1Gpbs上，但是这个价格捡垃圾没有其他选择了（

然后嘛……就是等待31号飞机飞回家里装咯，过两天再更新

~~其实折腾好了，但是我摸了，就咕了qwq~~

~~2022年的Update，你们以为我咕了，但是实际上我没咕，这何尝也是不是一种咕捏~~

G-010S-A 这个猫棒，要按照上面给出的 [Nokia G-010S-A Pin 6 Issue (rsaxvc.net)](https://rsaxvc.net/blog/2020/8/15/Nokia_G-010S-A_Pin_6_Issue.html) 这篇里面进行一个改造，才能兼容我的 Intel X520-DA2 网卡，改完之后是这样的

![](G-010S-A_mod.jpg)

然后……然后就直接按 [hwti/G-010S-A](https://github.com/hwti/G-010S-A) 上直接配好 SN 和 Password 就行了，家里宽带光猫装机的时候我直接问师傅要了全部接入数据，也就没有破解光猫这种问题了捏

至于华为 MA5671A 捏，不知道啥时候想写，这个就是要自己找个OP固件，拿 Flash 编程器刷进去就好了，稍微复杂一些，但是也很简单

MA5671A和G-010S-A其实是同方案的产品，但是固件不通用，有些小细节不同，MA5671A不用物理魔改电路这样

UPC和APC光纤的问题我最后是五块钱一条无源光转换线解决的