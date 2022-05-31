+++
title = "牛客 MobileService"
date = "2021-01-31T00:43:49+08:00"
tags = ["算法竞赛"]
math = true
description = ""
+++


题目链接:[Mobile Service](https://ac.nowcoder.com/acm/contest/1041/D)

这个题最简单的想法就是直接把三个人的位置直接都放进状态,然而这样子的话复杂度到了$O(N*L^3)$实在是难以接受的复杂度。

我们发现，员工的位置只要知道两个没有去服务上一个p[i]的人，第三个人一定在p[i]位置，因此我们知道其复杂度变为了$O(N*L^2)$已经是可以接受的状态了

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
//#define int long long
//#define int __int128
#define ull unsigned long long
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define pb(x) push_back(x)

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f,MOD=1e9+7;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
//void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));} //警告,如非必须(如__int128),请不要使用快写

int l,n,ans=INF;
int p[1003]={3};//让p[0]作为起始点=3
int c[203][203];
int f[1003][203][203];

void work()
{
    scanf("%d%d",&l,&n);//l=read();n=read();
    for(int i=1;i<=l;i++)
        for(int j=1;j<=l;j++) scanf("%d",&c[i][j]);//c[i][j]=read();
    for(int i=1;i<=n;i++) scanf("%d",p+i);//p[i]=read();
    mmst3f(f); f[0][1][2]=0;
    for(int i=0;i<n;i++)//p[0]已知为3,因此从0开始往i+1转移,然后得到结果
    {
        for(int x=1;x<=l;x++)
        {
            for(int y=1;y<=l;y++)
            {
                int z=p[i],nxt=p[i+1],now=f[i][x][y];
                if(x==y || x==z || y==z) continue;
                f[i+1][x][y]=min(f[i+1][x][y],now+c[z][nxt]);//让z去
                f[i+1][z][y]=min(f[i+1][z][y],now+c[x][nxt]);//让x去
                f[i+1][x][z]=min(f[i+1][x][z],now+c[y][nxt]);//让y去
            }
        }
    }
    for(int x=1;x<=l;x++) 
        for(int y=1;y<=l;y++) 
        {
            //if(x==y || x==p[n] || y==p[n]) continue; //ans初始值==INF所以可以不用这句话
            if(f[n][x][y]<ans) ans=f[n][x][y];
        }
    cout<<ans<<endl;
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

然后写完发现这样子的话就要去掉\#define int long long

那么这个其实是可以滚动数组缩内存的

```cpp
for(int i=0;i<n;i++)//p[0]已知为3,因此从0开始往i+1转移,然后得到结果
{
    for(int x=1;x<=l;x++)
    {
        for(int y=1;y<=l;y++)
        {
            int z=p[i],nxt=p[i+1],now=f[i&1][x][y];
            if(x!=nxt && y!=nxt) f[(i+1)&1][x][y]=min(f[(i+1)&1][x][y],now+c[z][nxt]);//让z去
            if(z!=nxt && y!=nxt) f[(i+1)&1][z][y]=min(f[(i+1)&1][z][y],now+c[x][nxt]);//让x去
            if(x!=nxt && z!=nxt) f[(i+1)&1][x][z]=min(f[(i+1)&1][x][z],now+c[y][nxt]);//让y去
            f[i&1][x][y]=0x3f3f3f3f;
        }
    }
}
```

