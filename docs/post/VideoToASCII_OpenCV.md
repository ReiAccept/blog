---
title : "使用OpenCV将视频转换为Terminal中的字符画"
date : "2020-03-18T21:25:04+08:00"
tags : ["寄术"]
---


很简单的OpenCV入门练习小项目

```python
import cv2 #OpenCV
import os #用于操作终端，比如清cls

a_char=list("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ") #将ASCII字符以灰度来排序
char_len=len(a_char)
Video=cv2.VideoCapture("OP.mp4")
output=[]

if Video.isOpened():
    rval,frame=Video.read()
    while rval:
        gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        text=""
        for i in gray:
            for j in i:
                text += a_char[int(j/256*char_len)]
            text += "\n"
        output.append(text)
        rval,frame=Video.read()
    for f in output:
        os.system("cls")
        print(f)

```

