---
author: Rei
title: "ICPC2014西安 F Color"
date: "2021-05-27T18:27:46+08:00"
tags: ["算法竞赛"]
math: true
ShowBreadCrumbs: false
---

https://codeforces.com/gym/100548/problem/F

### 题目大意

$N$朵花排成一行，我们有$M$种颜色，可以给这些花涂色，保证相邻的花的颜色不同

求最后恰好使用了$k$种颜色的方案数。

### 推算

第一反应就是 $\complement_m^k\ast\ k\left(k-1\right)^{n-1}$  当想了一下之后好像不对，这个公式算出来的是使用小于等于$k$种颜色的方案数量

然后推出如下公式 $\complement_k^x\ast x\left(x-1\right)^{n-1}$ 这个公式的含义是从$k$种颜色中再选出来$x$种使得相邻的格子不同色最后的颜色数小于等于$x$,每一个集合都有交,用容斥原理来处理

设 $S = F[x]=\complement_k^x\ast x\left(x-1\right)^{n-1}$

$ans=\complement_m^k\sum\left(-1\right)^{k-i}\complement_k^i\ast\ i\left(i-1\right)^{n-1}$

记得开long long

```cpp
#include<bits/stdc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
using namespace std;
typedef long long ll;
typedef long double rld;
typedef unsigned long long ull;

const rld eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f;//LLINF
const int N=(int)1e6+10,mod=1e9+7;

int read(){int s=0,w=1;char ch=getchar();while(!isdigit(ch)){if(ch=='-')w=-1;ch=getchar();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=getchar();} return s*w;}
//void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m,k;
int inv[N]={0,1},c[N]={1};

int qpow(int a ,int b)
{
    int ans=1;
    while(b)
    {
        if(b&1) ans=ans*a%mod;
        b>>=1;
        a=a*a%mod;
    }
    return ans;
}

void get_combine(int x)
{
    for(int i=1;i<=k;i++) c[i]=(c[i-1]*(x-i+1)%mod)*inv[i]%mod;
}

inline int calc(int x)
{
    return (c[x]*x%mod)*qpow(x-1,n-1)%mod;
}

void work()
{
    n=read();m=read();k=read();
    get_combine(m);
    int ans=c[k],ans1=0,flag=1;
    get_combine(k);
    for(int i=k;i>=1;i--)
    {
        ans1=(ans1+flag*calc(i)+mod)%mod;
        flag=-flag;
    }
    ans=ans*ans1%mod;
    cout<<ans<<endl;
    return;
}

signed main()
{
    for(int i=2;i<N;i++) inv[i]=(mod-mod/i)*inv[mod%i]%mod;
    //ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(int)read();
    for(signed Case=1; Case<=T; Case++)
    {
        printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```
