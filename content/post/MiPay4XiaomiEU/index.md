---
title: "XiaomiEU 固件添加国行 NFC"
date: 2025-12-12T20:50:27+08:00
math: true
slug: "MiPay4XiaomiEU"
# weight: 1
# aliases: ["/first"]
# tags: ["Tag1","Tag2"]
# categories: ["XCPC"]
# author: ["Me", "You"] # multiple authors
# showToc: true
# TocOpen: false
# draft: false
# hidemeta: false
# comments: false
# description: "Desc Text."
# image: "https://www.dmoe.cc/random.php"
---

近期将手机从 AfterlifeOS 这一类原生刷回了 HyperOS3, 小米14 的类原生还是不够完善

不过国行版本的 HyperOS 不超过三天就让我想把手机摔了, 因此刷了基于国行固件的魔改版本 [XIAOMI.EU](https://xiaomi.eu/community/)

但是刷完之后, 国行的 NFC 功能用不了, 我的车钥匙/门卡/交通卡可还依赖这玩意呢

找了一下还没有适配当前版本的 Kernel SU 模块, 于是自己解包做了一个

## 解包国行系统包

先下载国行包并解压
```bash
wget https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/OS3.0.5.0.WNCCNXM/houji-ota_full-OS3.0.5.0.WNCCNXM-user-16.0-306ce971bf.zip
unzip houji-ota_full-OS3.0.5.0.WNCCNXM-user-16.0-306ce971bf.zip payload.bin
```
现在的安卓刷机包大多会打成 payload.bin 这种包格式, 需要先解包

```bash
wget https://github.com/ssut/payload-dumper-go/releases/download/1.3.0/payload-dumper-go_1.3.0_linux_amd64.tar.gz
tar -xvf payload-dumper-go_1.3.0_linux_amd64.tar.gz
chmod +x payload-dumper-go
./payload-dumper-go -o ./ ./payload.bin
```

查看文件尺寸, 最大的是这个 `product.img` 用 `file` 指令查看后可以知道这是个 `erofs` 的单分区镜像包, 我们将其挂载

```bash
pacman -S erofs-utils erofsfuse
mkdir product
mount -t erofs -o loop product.img product
```

然后在挂载镜像的 `app` 目录下找到 `MINextpay` `MITSMClient` `UPTsmService` 三个必要组件, 将其打包成一个最简的 KernelSU module 刷入即可, 也就是只有 `system/app/组件` 和 `module.prop` 文件的最简包

```bash
cp -a ./product/app/MINextpay ./module/system/app/MINextpay
cp -a ./product/app/MITSMClient ./module/system/app/MITSMClient
cp -a ./product/app/UPTsmService ./module/system/app/UPTsmService
cp -a ./product/app/MIUISuperMarket ./module/system/app/MIUISuperMarket
```

为了方便后续更新版本, 做了个 Github Action 用来打包

其中奇怪的一点是, 在 Action 中使用 `mount -t erofs -o loop product.img product` 挂载镜像后 拷贝之后, 执行到 cp 这一步的时候会报

![挂载](actionError1.png)

![Github Action 报错](actionError2.png)

看上去是内存超限了的样子

因此换成了 `fsck.erofs product.img --extract=product` 指令将镜像中的文件提取出来

最后成品可以在 https://github.com/ReiAccept/MiPay4XiaomiEU 中找到