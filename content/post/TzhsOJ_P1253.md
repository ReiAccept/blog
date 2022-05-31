+++
title = "TzhsOJ P1253 仙人掌"
date = "2018-07-15T13:52:35+08:00"
tags = ["算法竞赛"]
description = ""
+++


由题意可知,**一定**存在一条连接i与i+1的边,因为**只存在一个**简单环,所以除了i到i+1的边之外,**只能**有一条边覆盖i到i+1这个位置,这样就转成了线段覆盖问题

```cpp
#include<cstdio>
#include<iostream>
#include<algorithm>
  
using namespace std;
  
int n,m,tot,cur;
  
struct node
{
    int x,y;
}e[200003];
  
bool cmp(const node&s1,const node&s2)
{
    return s1.y<s2.y;
}
  
int main()
{
    scanf("%d%d",&n,&m);
    int t=0;
    for(int i=1;i<=m;i++)
    {
        int x,y;
        scanf("%d%d",&x,&y);
        if(x>y)
            swap(x,y);
        if(x+1!=y)
        {
            e[++t].x=x;
            e[t].y=y;
        }
    }
    sort(e+1,e+t+1,cmp);
    for(int i=1;i<=t;i++)
        if(e[i].x>=cur)
        {
            cur=e[i].y;
            tot++;
        }
    printf("%d\n",tot+n-1);
    return 0;
}

```