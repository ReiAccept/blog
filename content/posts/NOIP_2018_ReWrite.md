+++
title = "在NOIP2018前重写之前的NOIP真题"
date = "2018-10-25T14:25:40+08:00"
tags = ["算法竞赛"]
description = ""
+++

貌似初赛过了的样子。。。。。  
有毒  
全年的Flag-->初赛不过穿女装  
然后就没过  
今年的Flag-->初赛过了穿女装  
然后救过了  
??????????????????????????????????????  
算了。。今年再立一个Flag  
  
# 要是NOIP有1=就女装  
算下来也至少三个月没写过代码了吧。。。  
按自己开心把以前写过的一些题目重写一遍,就在此记录吧。。  
也算是刷回手感吧  
  
## 只有水题,NOIP T1的那一种水题!  
  
## 铺地毯  
```cpp
  
#include<iostream>

using namespace std;

struct DT
{
    int a,b,g,k;
}a[10003];

int n,x,y;

int main()
{
    cin>>n;
    for(int i=1;i<=n;i++)
        cin>>a[i].a>>a[i].b>>a[i].g>>a[i].k;
    cin>>x>>y;
    for(int i=n;i>=1;i--)
    {
        if(a[i].a<=x && a[i].b<=y && x<=(a[i].a+a[i].g) && y<=(a[i].b+a[i].k))
        {
            cout<<i<<endl;
            return 0;
        }
    }
    cout<<"-1"<<endl;
    return 0;
}
  
```  
  
## 拼数  
  
```cpp

#include<iostream>
#include<algorithm>

using namespace std;

int n;
string a[23];

bool cmp(string a,string b)
{
    return a+b>b+a;
}

int main()
{
    cin>>n;
    for(int i=1;i<=n;i++)
        cin>>a[i];
    sort(a+1,a+1+n,cmp);
    for(int i=1;i<=n;i++)
        cout<<a[i];
    return 0;
}
  
```