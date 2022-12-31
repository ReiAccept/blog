+++
title = "在Ubuntu上启用指纹识别"
date = "2019-10-27T22:07:10+08:00"
tags = ["寄术"]
description = ""
+++


写着一篇的原因是中文网络上对于fprintd的教程已经严重与现在的Ubuntu脱节==  

网上写的是真的麻烦，实际上非常简单  

> ```bash
> sudo apt install -y fprintd libpam-fprintd
> ```

执行之后你就可以直接重启，然后用图形化设置界面录入指纹或者执行fprintd-enroll   

就那么简单，你可以用指纹来登录Ubuntu了。但是你现在暂时不能用它来通过sudo的密码验证  

因此你还需要  

> ```bash
> sudo pam-auth-update
> ```

然后在里面勾选上指纹识别，reboot即可。

百度上说的是真的麻烦==，实际上只要两条指令就好了  

最后附上我的配置  

Ubuntu 18.04  

从初中开始陪伴我的ThinkPad X230