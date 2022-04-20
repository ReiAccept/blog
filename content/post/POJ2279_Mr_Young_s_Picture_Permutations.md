+++
title = "POJ2279 Mr. Young's Picture Permutations"
date = "2021-01-13T02:21:29+08:00"
tags = ["算法竞赛"]
description = ""
+++


蛮有意思的一个DP,数据很小,但是直接开的话是会直接爆掉

做这个题是因为最近比较无头苍蝇，就刷李煜东的书和Steps

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define mmst0(x) memset(x,0,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n;
int s[6];

void work()
{
    while(n=read())
    {
        mmst0(s);
        for(int i=1;i<=n;i++) s[i]=read();
        int f[s[1]+1][s[2]+1][s[3]+1][s[4]+1][s[5]+1];
        mmst0(f);
        f[0][0][0][0][0]=1;
        for(int i=0;i<=s[1];i++)
        {
            for(int j=0;j<=s[2];j++)
            {
                for(int k=0;k<=s[3];k++)
                {
                    for(int l=0;l<=s[4];l++)
                    {
                        for(int m=0;m<=s[5];m++)
                        {
                            if(i<s[1]) f[i+1][j][k][l][m]+=f[i][j][k][l][m];
                            if(j<s[2] && j<i) f[i][j+1][k][l][m]+=f[i][j][k][l][m];
                            if(k<s[3] && k<j) f[i][j][k+1][l][m]+=f[i][j][k][l][m];
                            if(l<s[4] && l<k) f[i][j][k][l+1][m]+=f[i][j][k][l][m];
                            if(m<s[5] && m<l) f[i][j][k][l][m+1]+=f[i][j][k][l][m];
                        }
                    }
                }
            }
        }
        cout<<f[s[1]][s[2]][s[3]][s[4]][s[5]]<<endl;
    }
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

然后发现貌似MS更简单易懂一些(废话，哪有MS比DP难理解的)

```cpp
#include <bits/stdc++.h>
#define ll long long
using namespace std;

int k;
int len[6];
ll dp[31][16][11][8][7];

ll dfs(int a,int b,int c,int d,int e)
{
    if(a<0||b<0||c<0||d<0||e<0)return 0;
    ll &opt=dp[a][b][c][d][e];
    if(opt)return opt;
    opt=dfs(a,b,c,d,e-1);
    if(d>e)opt+=dfs(a,b,c,d-1,e);
    if(c>d)opt+=dfs(a,b,c-1,d,e);
    if(b>c)opt+=dfs(a,b-1,c,d,e);
    if(a>b)opt+=dfs(a-1,b,c,d,e);
    return opt;
}

int main()
{
    while(scanf("%d",&k) && k)
    {
        memset(len,0,sizeof(len));
        memset(dp,0,sizeof(dp));
        dp[0][0][0][0][0]=1;
        for(int i=1; i<=k; i++) scanf("%d",len+i);
        printf("%lld\n",dfs(len[1],len[2],len[3],len[4],len[5]));
    }
    return 0;
}
```

最后看lyd书的题解发现这玩意的数学名称叫做杨氏矩阵.......有公式算的,wdnmd

```cpp
#include<bits/stdc++.h>
#define ll long long

using namespace std;

ll n,cnt,x,y,tmp,num[40],sum[5200];

int main()
{
    while(scanf("%lld",&n)&&n)
    {
        memset(sum,0,sizeof(sum));
        cnt=0,x=1,y=1;
        for(int i=1; i<=n; i++)scanf("%lld",&num[i]);
        for(int i=1; i<=n; i++)
            for(int j=1; j<=num[i]; j++)
            {
                cnt++;
                for(int k=i+1; k<=n; k++)
                {
                    if(num[k]>=j)sum[cnt]++;
                    else break;
                }
                sum[cnt]+=num[i]-j+1;
            }
        for(int i=1; i<=cnt; i++)
        {
            x*=i;
            y*=sum[i];
            tmp=__gcd(x,y);
            x/=tmp;
            y/=tmp;
        }
        printf("%lld\n",x/y);
    }
    return 0;
}
```

