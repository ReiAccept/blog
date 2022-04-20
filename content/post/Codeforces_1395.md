+++
title = "Codeforces 1395"
date = "2020-08-14T09:52:00+08:00"
tags = ["算法竞赛"]
description = ""
+++


[Boboniu Likes to Color Balls](https://codeforces.com/contest/1395/problem/A)

```cpp
#include<iostream>

using namespace std;

int T,r,g,b,w;

int main()
{
    cin>>T;
    while(T--)
    {
        cin>>r>>g>>b>>w;
        int cnt2,cnt=(r&1)+(g&1)+(b&1)+(w&1);
        if(r>0 && g>0 && b>0)cnt2=((r-1)&1)+((g-1)&1)+((b-1)&1)+((w+3)&1);
        else cnt2=2;
        if(cnt<=1 || cnt2<=1)cout<<"YES"<<endl;
        else cout<<"NO"<<endl;
    }
    return 0;
}
```

[Boboniu Plays Chess](https://codeforces.com/contest/1395/problem/B)

```cpp
#include<iostream>

using namespace std;

int n,m,x,y;
bool vis[103][103];

inline void out(int x,int y)
{
    cout<<x<<" "<<y<<endl;
}

int main()
{
    cin>>n>>m>>x>>y;
    vis[x][y]=vis[1][y]=vis[1][1]=true;
    out(x,y);
    out(1,y);
    out(1,1);
    for(int i=1;i<=n;i++)
    {
        if(i%2)
        {
            for(int j=1;j<=m;j++)
            {
                if(!vis[i][j])
                {
                    vis[i][j]=true;
                    out(i,j);
                }
            }
        }
        else
        {
            for(int j=m;j>=1;j--)
            {
                if(!vis[i][j])
                {
                    vis[i][j]=true;
                    out(i,j);
                }
            }
        }
    }
    return 0;
}
```

[Boboniu and Bit Operations](https://codeforces.com/contest/1395/problem/C)

```cpp
#include<cstdio>

using namespace std;

int pa[209],pb[209];
int a[209][40],b[209][40],n,m,sum;
bool vis[209][209];

void readx(int r,char q)
{
    int x,cnt;
    for(int i=1;i<=r;i++)
    {
        scanf("%d",&x);
        cnt=32;
        if(q=='a')pa[i]=x;
        else pb[i]=x;
        while(x)
        {
            if(q=='a')a[i][cnt--]=x&1;
            else b[i][cnt--]=x&1;
            x>>=1;
        }
    }
}

int main()
{
    scanf("%d%d",&n,&m);
    readx(n,'a');
    readx(m,'b');
    for(int k=0; k<=32; k++)
    {
        bool q=true,t;
        for(int i=1; i<=n; i++)if(a[i][k])
            {
                t=false;
                for(int j=1; j<=m; j++) if(!b[j][k] && !vis[i][j]) t=true;
                q&=t;
            }
        if(!q)continue;
        for(int i=1; i<=n; i++)
            if(a[i][k])
            {
                bool flag=0;
                for(int j=1; j<=m; j++) if(!b[j][k] && !vis[i][j]) flag=true;
                if(flag) for(int j=1; j<=m; j++) vis[i][j]|=(b[j][k]==1);
            }
    }
    for(int i=1; i<=n; i++)
        for(int j=1; j<=m; j++)
            if(!vis[i][j])
            {
                sum|=pa[i]&pb[j];
                break;
            }
    printf("%d\n",sum);
    return 0;
}
```

[Boboniu Chats with Du](https://codeforces.com/contest/1395/problem/D)

```cpp
#include<cstdio>
#include<vector>
#include<algorithm>

using namespace std;

int n,d,m;
int a[100003];
long long res;
long long sum[2][100003];
vector<int> b[2];

int main()
{
    scanf("%d%d%d",&n,&d,&m);
    for (int i=1;i<=n;i++)
    {
        scanf("%d",a+i);
        b[a[i]>m].emplace_back(a[i]);
    }
    sort(b[0].begin(), b[0].end());
    reverse(b[0].begin(), b[0].end());
    sum[0][0]=0;
    for (signed int i=0; i<(int)b[0].size(); i++)sum[0][i+1]=sum[0][i]+b[0][i];
    sort(b[1].begin(), b[1].end());
    reverse(b[1].begin(), b[1].end());
    sum[1][0]=0;
    for (int i=0; i<(int)b[1].size(); i++)sum[1][i+1]=sum[1][i]+b[1][i];
    res = sum[0][b[0].size()];
    for (int i = 0;i<(int)b[1].size();i++)
    {
        if (i*(d+1)+1 > n) break;
        int rest = min((int)b[0].size(), n-i*(d+1)-1);
        res = max(res, sum[1][i+1]+sum[0][rest]);
    }
    printf("%lld\n",res);
    return 0;
}
```

