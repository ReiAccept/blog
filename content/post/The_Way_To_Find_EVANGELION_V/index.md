+++
title = "找寻消失的《EVANGELION 超•現實》导演完全版"
date = "2021-01-09T20:51:53+08:00"
tags = ["折腾"]
description = ""
image = "pic1.jpg"
+++


头图上的的Rei我记得是在我之前在一部叫做《**EVANGELION 超•現實**》的3DCG里看到的，当时我差点以为这个是真人拍摄，了解后才知道这个是一个国人做的3DCG，是建模渲染出来的

然而当我今天去再度寻找这部片子的时候，发现怎么变成了手机广告？？？？？

然后才知道这部片子是作为广告片来拍摄，由于版权方的限制，不能讲我们之前先看到的导演完全版放出

然后我找到了原作者的VIMEO地址 [SOMEI 晟 - Creative Director & Motion Designer (vimeo.com)](https://vimeo.com/SOMEI)

在这里，原作者留下了一段话

![](pic2.png)

原作者将短片放在了Adobe家的Behance上[EVANGELION 超•現實 on Behance](https://www.behance.net/gallery/99648687/EVANGELION-)

有趣的是作者对其进行了加密保护

> the Password is hide in orignal anime. and I also left some clues somewhere. Maybe you can find it out :)

我擦，我不擅长找密码这种东西啊QAQ

发现其是插vimeo的iframe

https://player.vimeo.com/video/433112136/

于是乎尝试了几条很明显的如"IT CAN NOT BE TRUE"之后宣告放弃,以后有空再去找好了

拉到下面之后发现了一条作者留下的花絮短片，我寻思这个在B站也没了，那就先下下来存着好了

于是F12之,发现其实一个iframe，找到其src位于

https://player.vimeo.com/video/433293750

打开后再次F12之，Ctrl+F搜索m3u8

得到js函数贴到VSC中格式化，截取其中有用的段落

```javascript
(function (document, player) {
    var config = {
        "cdn_url": "https://f.vimeocdn.com", "vimeo_api_url": "api.vimeo.com", "request": {
            "files": {
                "dash": {
                    "separate_av": true, "streams": [{
                        "profile": 165, "quality": "540p", "id": "f1554135-73c7-45a6-a49f-8bcb9aac9f1c", "fps": 25
                    }, {
                        "profile": 174, "quality": "720p", "id": "d4b9e335-2533-4c96-94a4-3aece0566c90", "fps": 25
                    }, {
                        "profile": 139, "quality": "240p", "id": "e600b29b-1ebd-4feb-94c8-8343c3d648e8", "fps": 25
                    }, {
                        "profile": 175, "quality": "1080p", "id": "74330060-6592-42f8-bd57-a5e986e562d3", "fps": 25
                    }, {
                        "profile": 164, "quality": "360p", "id": "2f43be78-072f-4a32-bd6f-36fdebbb7594", "fps": 25
                    }], "cdns": {
                        "akfire_interconnect_quic": {
                            "url": "https://159vod-adaptive.akamaized.net/exp=1610199664~acl=%2Fd1a70b97-5bd1-439e-aae0-61ab3907d52e%2F%2A~hmac=343de3a09d9771fadf03f7dde5bdd4291df62051164b9d84668498f980686358/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/f1554135,d4b9e335,e600b29b,74330060,2f43be78/master.json?base64_init=1", "origin": "gcs", "avc_url": "https://159vod-adaptive.akamaized.net/exp=1610199664~acl=%2Fd1a70b97-5bd1-439e-aae0-61ab3907d52e%2F%2A~hmac=343de3a09d9771fadf03f7dde5bdd4291df62051164b9d84668498f980686358/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/f1554135,d4b9e335,e600b29b,74330060,2f43be78/master.json?base64_init=1"
                        }, "fastly_skyfire": {
                            "url": "https://skyfire.vimeocdn.com/1610199664-0xf3ded9e996a5d034737a2c0a66008754707ec96a/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/f1554135,d4b9e335,e600b29b,74330060,2f43be78/master.json?base64_init=1", "origin": "gcs", "avc_url": "https://skyfire.vimeocdn.com/1610199664-0xf3ded9e996a5d034737a2c0a66008754707ec96a/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/f1554135,d4b9e335,e600b29b,74330060,2f43be78/master.json?base64_init=1"
                        }
                    }, "streams_avc": [{
                        "profile": 165, "quality": "540p", "id": "f1554135-73c7-45a6-a49f-8bcb9aac9f1c", "fps": 25
                    }, {
                        "profile": 174, "quality": "720p", "id": "d4b9e335-2533-4c96-94a4-3aece0566c90", "fps": 25
                    }, {
                        "profile": 139, "quality": "240p", "id": "e600b29b-1ebd-4feb-94c8-8343c3d648e8", "fps": 25
                    }, {
                        "profile": 175, "quality": "1080p", "id": "74330060-6592-42f8-bd57-a5e986e562d3", "fps": 25
                    }, {
                        "profile": 164, "quality": "360p", "id": "2f43be78-072f-4a32-bd6f-36fdebbb7594", "fps": 25
                    }], "default_cdn": "akfire_interconnect_quic"
                }, "hls": {
                    "separate_av": true, "default_cdn": "akfire_interconnect_quic", "cdns": {
                        "akfire_interconnect_quic": {
                            "url": "https://159vod-adaptive.akamaized.net/exp=1610199664~acl=%2Fd1a70b97-5bd1-439e-aae0-61ab3907d52e%2F%2A~hmac=343de3a09d9771fadf03f7dde5bdd4291df62051164b9d84668498f980686358/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/e600b29b,f1554135,2f43be78,74330060,d4b9e335/master.m3u8", "origin": "gcs", "avc_url": "https://159vod-adaptive.akamaized.net/exp=1610199664~acl=%2Fd1a70b97-5bd1-439e-aae0-61ab3907d52e%2F%2A~hmac=343de3a09d9771fadf03f7dde5bdd4291df62051164b9d84668498f980686358/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/e600b29b,f1554135,2f43be78,74330060,d4b9e335/master.m3u8"
                        }, "fastly_skyfire": {
                            "url": "https://skyfire.vimeocdn.com/1610199664-0xf3ded9e996a5d034737a2c0a66008754707ec96a/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/e600b29b,f1554135,2f43be78,74330060,d4b9e335/master.m3u8", "origin": "gcs", "avc_url": "https://skyfire.vimeocdn.com/1610199664-0xf3ded9e996a5d034737a2c0a66008754707ec96a/d1a70b97-5bd1-439e-aae0-61ab3907d52e/sep/video/e600b29b,f1554135,2f43be78,74330060,d4b9e335/master.m3u8"
                        }
                    }
                }, "progressive": [{
                    "profile": 139, "width": 426, "mime": "video/mp4", "fps": 25, "url": "https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019901.mp4~hmac=a2a21ac4f29f32417702713c7b49a15d70b243a0866ffa23a9bcf314298cd9b7/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019901.mp4", "cdn": "akamai_interconnect", "quality": "240p", "id": "e600b29b-1ebd-4feb-94c8-8343c3d648e8", "origin": "gcs", "height": 214
                }, {
                    "profile": 165, "width": 960, "mime": "video/mp4", "fps": 25, "url": "https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019909.mp4~hmac=db591e6eb9ec358fc23788d6dcaafd28d570aaeb93ba185f66813289050b081d/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019909.mp4", "cdn": "akamai_interconnect", "quality": "540p", "id": "f1554135-73c7-45a6-a49f-8bcb9aac9f1c", "origin": "gcs", "height": 480
                }, {
                    "profile": 164, "width": 640, "mime": "video/mp4", "fps": 25, "url": "https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019938.mp4~hmac=29f3faf21f11e056ef6ea18be5bdb2b49b75b4855f6c1cd6bd62d261de5fba76/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019938.mp4", "cdn": "akamai_interconnect", "quality": "360p", "id": "2f43be78-072f-4a32-bd6f-36fdebbb7594", "origin": "gcs", "height": 320
                }, {
                    "profile": 175, "width": 2048, "mime": "video/mp4", "fps": 25, "url": "https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019906.mp4~hmac=759a3e3d960ec262f40d82368f6ff4e9775ea5cf64f41aa68e13b338cf15da12/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019906.mp4", "cdn": "akamai_interconnect", "quality": "1080p", "id": "74330060-6592-42f8-bd57-a5e986e562d3", "origin": "gcs", "height": 1024
                }, {
                    "profile": 174, "width": 1366, "mime": "video/mp4", "fps": 25, "url": "https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019898.mp4~hmac=b42b181b789c43780c8552f89aa509416b1d6988b51228af264c149bb9e4e29e/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019898.mp4", "cdn": "akamai_interconnect", "quality": "720p", "id": "d4b9e335-2533-4c96-94a4-3aece0566c90", "origin": "gcs", "height": 684
                }]

```

发现有MP4链接直接可以下

https://vod-progressive.akamaized.net/exp=1610199664~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1658%2F17%2F433293750%2F1886019906.mp4~hmac=759a3e3d960ec262f40d82368f6ff4e9775ea5cf64f41aa68e13b338cf15da12/vimeo-prod-skyfire-std-us/01/1658/17/433293750/1886019906.mp4

完美wwwwwwwww

原版视频后来发现TapTap上有，F12找m3u8下载老一套了

说起来m3u8这玩意。。。令我印象最深刻的就是学堂在线的直播课那个小鹅通的互动直播间，直接F12，m3u8链接放在Console里面的，直接贴了下，有个买了2999算法网课的同学上次找我能不能下下来离线看然后无聊看了一下发现这个学堂在线直接裸的m3u8只分段不加密给我吓到了