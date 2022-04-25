+++
title = "2018吉林省省赛重现"
date = "2021-01-13T17:34:26+08:00"
tags = ["算法竞赛"]
description = ""
+++


## 过程

开局一眼秒掉A，看了B发现就是个时区转换的语法题，张峻豪自告奋勇写B题，然后我就开始和ZJQ去看C题了。大概四十分钟之后约莫是做出C了，就是个优先队列的水题==然后问ZJH有没有写好B，然后发现他写了四十分钟的时区转换语法题WA了。。。。。然后叫停ZJH，我自己来写时区转换，语法题一遍过。然后C思路和ZJQ已经论证完成，按思路写下来，在调样例的时候把Bug找到了，AC C题。写的时候ZJQ把概率DP推出来了，AC D题。接下来F发现自己以前做过了，全xor一起就行。

剩下一个计算机和E和贪心I题，以及线段树H感觉可以写（当然最后没写H）

推I题，三个人就我玩过完整的游戏王卡片，然后解释题面，发现是个分两种情况讨论的贪心，最后取max(ans1,ans2)。让ZJQ给我造了组特殊的测试数据。然后思路对了就过了。

## A

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

void work()
{
    n=read();
    int ans=(int)sqrt(n);
    if(ans%2==1) printf("odd\n");
    else printf("even\n");
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        printf("Case %lld: ",Case);
        work();
    }
    return 0;
}
```

## B

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
//#define int long long
//#define int __int128
#define ull unsigned long long
#define mmst0(x) memset(x,0,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int t,s,f;
string m,s1,s2;

void work()
{
    scanf("%d:%d",&s,&f);
    cin>>m>>s1>>s2;
    if(m[0]=='A'&&s==12) s=0;
    else if(m[0]=='P'&&s!=12) s+=12;
    if(s1=="Moscow") s-=3;
    else if(s1=="Beijing") s-=8;
    else if(s1=="Washington") s+=5;
    if(s2=="Moscow") s+=3;
    else if(s2=="Beijing") s+=8;
    else if(s2=="Washington") s-=5;
    if(s<0)
    {
        printf("Yesterday ");
        s+=24;
    }
    else if(s>=24)
    {
        printf("Tomorrow ");
        s-=24;
    }
    else printf("Today ");
    if(s==0) printf("12:%02d AM\n",f);
    else if(s>=1&&s<12) printf("%d:%02d AM\n",s,f);
    else if(s==12) printf("12:%02d PM\n",f);
    else printf("%d:%02d PM\n",s-12,f);

    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=read();
    for(int Case=1; Case<=T; Case++)
    {
        printf("Case %d: ",Case);
        work();
    }
    return 0;
}
```

## C

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
int fa[100003];
bool vis[100003];
priority_queue<pair<int,int> > q;

void INIT()
{
    n=read();
    for(int i=1;i<=n;i++) fa[i]=i;
    while(!q.empty()) q.pop();
    mmst0(vis);
}

int find_root(int x) 
{
    return fa[x]==x?x:fa[x]=find_root(fa[x]);
}
int unionset(int x,int y)
{
    int xx=find_root(x),yy=find_root(y);
    if(xx>yy) swap(xx,yy);
    fa[xx]=yy; 
    return yy;
}

void work()
{
    for(int i=1;i<=n;i++)
    {
        q.push({read(),i});
    }
    while(!q.empty() && q.top().first>1)
    {
        int fi=q.top().first,se=q.top().second;
        q.pop();
        if(fi!=q.top().first) continue;//不能合并了
        if(q.empty()) break;
        int u=q.top().second;
        q.pop();
        int ee=unionset(se,u);
        q.push({fi-1,ee});
    }
    if(q.size()<2)
    {
        printf("NO\n");
        return;
    }
    int ee=q.top().second;
    for(int i=1;i<=n;i++)
    {
        if(find_root(i)==ee) vis[i]=true;
         else vis[i]=false;
    }
    printf("YES\n");
    for(int i=1;i<=n;i++) cout<<vis[i];
    cout<<endl;
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        printf("Case %lld: ",Case);
        INIT();
        work();
    }
    return 0;
}
```

## D

```cpp
#include<bits/stdc++.h>
#define ll long long

using namespace std;

int read()
{
	char c;
	int num,f=1;
	while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;
	num=(int)(c-'0');
	while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');
	return num*f;
}

int pp;
double dp[250];
void work()
{
	pp=read();
	double p=pp/100.0;
	memset(dp,0,sizeof(dp));
	dp[200]=1.0/p;
	for(int i=199;i>=4;i--)
	{
		double q=i/200.0;
		dp[i]=1+p*(1-q)*dp[min(i+4,200)]+(1-p)*dp[min(i+3,200)];
	}
	return;
}

signed main()
{
	int T=read();
	for(int Case=1;Case<=T;Case++)
	{
		work();
		printf("Case %d: %.10lf\n",Case,dp[4]);
	}
	return 0;
}
```

## E

```cpp
#include<bits/stdc++.h>

using namespace std;

int T,Case;

double deta(double a,double b,double c)
{
    double ans=b*b-4*a*c;
    ans=sqrt(ans);
    return ans;
}

int main()
{
    cin>>T;
    double r,h,x0,y0,z0,vx,vy,vz;
    while(T--)
    {
        cin>>r>>h;
        cin>>x0>>y0>>z0;
        cin>>vx>>vy>>vz;
        double a=vx*vx+vy*vy-vz*vz*r*r/(h*h);
        double b=2*x0*vx+2*y0*vy+2*r*r*vz/h-2*z0*vz*r*r/(h*h);
        double c=x0*x0+y0*y0-r*r+2*r*r*z0/h-r*r*z0*z0/(h*h);
        double t2=(-b-deta(a,b,c))/(2*a);
        printf("Case %d: %.10lf\n",++Case,t2);
    }
    return 0;
}
```

## F

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

void work()
{
    int n=read(),ans=0;
    for(int i=1;i<=n;i++)
    {
        ans^=max((int)0,min(i-2,read()-2));
    }
    printf("%lld\n",ans);
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        printf("Case %lld: ",Case);
        work();
    }
    return 0;
}
```

## H

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pLi;
typedef pair<int, LL> pil;;
typedef pair<int, int> pii;
typedef unsigned long long uLL;

#define lson rt<<1
#define rson rt<<1|1
#define lowbit(x) x&(-x)
#define name2str(name) (#name)
#define bug printf("*********\n")
#define debug(x) cout<<#x"=["<<x<<"]" <<endl
#define FIN freopen("D://Code//in.txt","r",stdin)
#define IO ios::sync_with_stdio(false),cin.tie(0)

const double eps = 1e-8;
const int mod = 1e9 + 7;
const int maxn = 1e5 + 7;
const double pi = acos(-1);
const int inf = 0x3f3f3f3f;
const LL INF = 0x3f3f3f3f3f3f3f3fLL;

char op[10];
int t, n, q, l, r, x;

struct node {
    int l, r;
    int sum1, sum2;
    int vis, lazy1, lazy2, lazy3;
}segtree[maxn<<2];

void push_up(int rt) {
    segtree[rt].sum1 = (segtree[lson].sum1 + segtree[rson].sum1) % mod;
    segtree[rt].sum2 = (segtree[lson].sum2 + segtree[rson].sum2) % mod;
}

void push_down(int rt) {
    if(!segtree[rt].vis) return;
    int x = segtree[rt].lazy1, y = segtree[rt].lazy2, z = segtree[rt].lazy3;
    segtree[rt].vis = segtree[rt].lazy1 = segtree[rt].lazy2 = 0, segtree[rt].lazy3 = 1;
    segtree[lson].vis = segtree[rson].vis = 1;
    segtree[lson].lazy1 = (1LL * segtree[lson].lazy3 * x % mod + segtree[lson].lazy1) % mod;
    segtree[rson].lazy1 = (1LL * segtree[rson].lazy3 * x % mod + segtree[rson].lazy1) % mod;
    segtree[lson].lazy2 = (1LL * z * segtree[lson].lazy2 % mod + y) % mod;
    segtree[rson].lazy2 = (1LL * z * segtree[rson].lazy2 % mod + y) % mod;
    segtree[lson].sum1 = ((1LL * segtree[lson].sum2 * z % mod * x % mod + 1LL * segtree[lson].sum1 * z % mod) % mod + 1LL * y * (segtree[lson].r - segtree[lson].l + 1) % mod) % mod;
    segtree[rson].sum1 = ((1LL * segtree[rson].sum2 * z % mod * x % mod + 1LL * segtree[rson].sum1 * z % mod) % mod + 1LL * y * (segtree[rson].r - segtree[rson].l + 1) % mod) % mod;
    segtree[lson].sum2 = 1LL * segtree[lson].sum2 * z % mod * z % mod;
    segtree[rson].sum2 = 1LL * segtree[rson].sum2 * z % mod * z % mod;
    segtree[lson].lazy3 = 1LL * segtree[lson].lazy3 * z % mod;
    segtree[rson].lazy3 = 1LL * segtree[rson].lazy3 * z % mod;
}

void build(int rt, int l, int r) {
    segtree[rt].l = l, segtree[rt].r = r;
    segtree[rt].lazy1 = segtree[rt].lazy2 = 0;
    segtree[rt].lazy3 = 1;
    segtree[rt].sum1 = segtree[rt].vis = 0, segtree[rt].sum2 = 1;
    if(l == r) return;
    int mid = (l + r) >> 1;
    build(lson, l, mid);
    build(rson, mid + 1, r);
    push_up(rt);
}

void update(int rt, int l, int r, int x) {
    if(segtree[rt].l == l && segtree[rt].r == r) {
        segtree[rt].vis = 1;
        segtree[rt].lazy2 = (10LL * segtree[rt].lazy2 + x) % mod;
        segtree[rt].lazy1 = (1LL * segtree[rt].lazy3 * x % mod + segtree[rt].lazy1) % mod;
        segtree[rt].sum1 = (10LL * ((1LL*segtree[rt].sum2 * x % mod + segtree[rt].sum1 % mod) % mod) % mod + x * (r - l + 1)) % mod;
        segtree[rt].sum2 = 100LL * segtree[rt].sum2 % mod;
        segtree[rt].lazy3 = 10LL * segtree[rt].lazy3 % mod;
        return;
    }
    push_down(rt);
    int mid = (segtree[rt].l + segtree[rt].r) >> 1;
    if(r <= mid) update(lson, l, r, x);
    else if(l > mid) update(rson, l, r, x);
    else {
        update(lson, l, mid, x);
        update(rson, mid + 1, r, x);
    }
    push_up(rt);
}

int query(int rt, int l, int r) {
    if(segtree[rt].l == l && segtree[rt].r == r) return segtree[rt].sum1;
    push_down(rt);
    int mid = (segtree[rt].l + segtree[rt].r) >> 1;
    if(r <= mid) return query(lson, l, r);
    else if(l > mid) return query(rson, l, r);
    else return (query(lson, l, mid) + query(rson, mid + 1, r)) % mod;
}

int main() {
#ifndef ONLINE_JUDGE
    FIN;
#endif // ONLINE_JUDGE
    scanf("%d", &t);
    int icase = 0;
    while(t--) {
        scanf("%d%d", &n, &q);
        build(1, 1, n);
        printf("Case %d:\n", ++icase);
        while(q--) {
            scanf("%s%d%d", op, &l, &r);
            if(op[0] == 'w') {
                scanf("%d", &x);
                update(1, l, r, x);
            } else printf("%d\n", query(1, l, r));
        }
    }
    return 0;
}
```

## I

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
const int maxn=1e5+3;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

struct Node
{
    int value,pos;
    bool operator <(const Node &d)const
    {
        return value<d.value;
    }
} node[maxn];

int T,Case,n,m,sum,sum1,ans,ans1,cnt;//cnt->防御个数
int a[maxn],b[maxn];

void work()
{
    n=read();m=read();
    ans=ans1=sum=sum1=cnt=0;
    for(int i=0; i<n; i++)
    {
        a[i]=read();
        sum+=a[i];
    }
    for(int i=0; i<m; i++) node[i].value=read();
    for(int i=0; i<m; i++)
    {
        node[i].pos=read();
        if(!node[i].pos) sum1+=node[i].value;
        if(node[i].pos) b[cnt++]=node[i].value;
    }
    sort(node,node+m);
    sort(a,a+n);
    bool flag=false;
    if(n>=m)
    {
        int i=n-1,j=m-1;
        for(; i>=0&&j>=0; i--)
        {
            if(node[j].value<=a[i]) j--;
            else break;
            if(!j) break;
        }
        if(!j) flag=true;
    }
    if(flag)
    {
        int j=0;
        for(int i=0; i<n&&j<cnt; i++)
            if(a[i]>=b[j])
            {
                j++;
                sum-=a[i];
            }
        if(j!=cnt) flag=0;
        else ans=sum-sum1;
    }
    int i=n-1,j=0;
    for(; i&&j<m; i--)
    {
        if(a[i]>=node[j].value)
        {
            if(!node[j].pos) ans1+=(a[i]-node[j].value);
            j++;
        }
        else break;
    }
    printf("Case %lld: %lld\n",++Case,max(ans,ans1));
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

