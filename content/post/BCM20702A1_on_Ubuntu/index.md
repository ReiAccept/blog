+++
title = "BCM20702A1在Ubuntu下无法连接设备"
date = "2019-11-04T22:03:39+08:00"
tags = ["寄术"]
description = ""
slug = "BCM20702A1_on_Ubuntu"
categories = "Hardware"
+++


给X230换了张DW1550网卡，其实就是戴尔版的BCM94352网卡==

试了一下刷白名单BIOS和Coreboot，感觉Coreboot还是有点问题，还是用魔改白名单BIOS了

然后屏蔽51脚，拆掉机器自带的蓝牙模块(BCM92070MD)，网卡在Ubuntu里面安装bcmwl-kernel-source正常工作，然后遇到一个蛇皮问题，就是虽然网卡附带的蓝牙(BCM20702A1)识别正常，但是很蛋疼的是可以和设备配对但是不能连接==

![dmesg截图](dmesg.png)

看样子是缺少了文件==

最后从redhat的bug报告上面找到了解决方法==，askUbuntu上面都没啥软用，redhat还是牛逼

https://bugzilla.redhat.com/show_bug.cgi?id=1264153

上面说的蛮麻烦的==，要从Windows驱动里面掏出文件然后转格式==

实际上Github上有大佬已经帮忙转制好了qwq

```bash
sudo wget --tries=3 --timeout=120 https://github.com/winterheart/broadcom-bt-firmware/raw/master/brcm/BCM20702A1-413c-8143.hcd -P /lib/firmware/brcm
```

reboot

一条指令完事~\ (≧▽≦) /~

当然，如果你的机器也出现这个问题的话，你要根据你序号的不同选择不同的文件==