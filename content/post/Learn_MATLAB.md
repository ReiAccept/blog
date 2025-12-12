---
title: "MATLAB学习笔记"
date: "2019-10-28T08:00:49+08:00"
tags: ["学习"]
description: ""
---


MATLAB的数组访问好鬼畜啊，全下标是符合各种编程语言的先行再列，然后单下标(索引值)居然是先列再行==绝了

```matlab
>> A=[1 2 3 4;5 6 7 8]

A =

     1     2     3     4
     5     6     7     8

>> A(1,3)

ans =

     3

>> A(3)

ans =

     2
```

元胞数组的创建于连接

```matlab
>> a(1,1)={'mdzz'}

a = 

    'mdzz'

>> a(1,2)={ones(3)}

a = 

    'mdzz'    [3x3 double]

>> a{2,1}='qwq'

a = 

    'mdzz'    [3x3 double]
    'qwq'               []

>> a{2,2}='matlab'

a = 

    'mdzz'    [3x3 double]
    'qwq'     'matlab'    

>> b=a

b = 

    'mdzz'    [3x3 double]
    'qwq'     'matlab'    

>> c=[a b]

c = 

    'mdzz'    [3x3 double]    'mdzz'    [3x3 double]
    'qwq'     'matlab'        'qwq'     'matlab'    

>> c=[a;b]

c = 

    'mdzz'    [3x3 double]
    'qwq'     'matlab'    
    'mdzz'    [3x3 double]
    'qwq'     'matlab'    
    
  >> b=cell(2,3)

b = 

    []    []    []
    []    []    []
```

