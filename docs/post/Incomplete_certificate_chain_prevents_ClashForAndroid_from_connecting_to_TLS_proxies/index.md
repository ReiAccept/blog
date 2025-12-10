---
title: "Incomplete certificate chain prevents ClashForAndroid from connecting to TLS proxies"
date: 2023-01-01T04:18:13+08:00
math: true
slug: "Incomplete_certificate_chain_prevents_ClashForAndroid_from_connecting_to_TLS_proxies"
# weight: 1
# aliases: ["/first"]
tags: ["寄术"]
# categories: ["XCPC"]
# author: ["Me", "You"] # multiple authors
# showToc: true
# TocOpen: false
# draft: false
# hidemeta: false
# comments: false
# description: "Desc Text."
image: "pic.jpg"
---

Over the past few days , ClashForAndroid could not connect TLS proxies. The reason was found in the log

```
x509: vertificate signed by unknown authority
```

And , This `config.yaml` works well on Windows/Arch Linux/macOS/iOS(Stash)

At first, I wondered if the RootCA of my certificate was not trusted by Android? But using Chrome/Edge to access the https page built with the same certificate shows that the certificate is trusted.

After asking a friend who is an Android developer, he said: "Since Android 7.0, third-party applications do not trust manually installed root certificates by default."

However, this RootCA is not installed manually. It is ISRG Root X1 directly built into the system. (I use the certificate issued by Let's Encrypt)

Then I saw an article that solved the problem: [如何补全 SSL 证书链？](https://cloud.tencent.com/document/product/400/52983)

> 通常情况下 PC 端浏览器都可以通过 Authority Info Access（权威信息访问）的 URL 链接获得中间证书，但在部分 Android 系统的浏览器上访问时会出现证书不可信或无法访问等问题。
> 
> 主要原因在于部分 Android 系统的浏览器并不支持通过 Authority Info Access（权威信息访问）的 URL 链接获得中间证书，这时您需要把证书链文件按照 SSL 证书链的结构合并为一个文件重新部署到服务器上，浏览器在与服务器连接时将会下载用户证书和中间证书，使您的浏览器访问时显示为可信证书。

After using fullchain.cer , the proxies can connect normally. Chrome/Edge on Android can visit website with intermediate certificate because it has built-in "Authority Info Access" capabilities.

Tips: In some versions of OpenWRT, it is also not supported to automatically download and complete intermediate certificates through "Authority Info Access".