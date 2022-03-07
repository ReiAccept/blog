---
title: "Namomo Spring Camp 2022 Div1 每日一题"
date: 2022-03-07T20:18:28+08:00
math: true
# weight: 1
# aliases: ["/first"]
tags: ["算法竞赛"]
# author: ["Me", "You"] # multiple authors
# showToc: true
# TocOpen: false
# draft: false
# hidemeta: false
# comments: false
# description: "Desc Text."
# canonicalURL: "https://canonical.url/to/page"
# disableHLJS: true # to disable highlightjs
# disableShare: false
# disableHLJS: false
# hideSummary: false
# searchHidden: true
# ShowReadingTime: true
# ShowBreadCrumbs: true
# ShowPostNavLinks: true
# cover:
#     image: "<image path/url>" # image path/url
#     alt: "<alt text>" # alt text
#     caption: "<text>" # display caption under cover
#     relative: false # when using page bundles set this to true
#     hidden: true # only hide on current single page
# editPost:
#     URL: "https://github.com/<path_to_repo>/content"
#     Text: "Suggest Changes" # edit text
#     appendFilePath: true # to append file path to Edit link
---

# Day1 \#436. 子串的最大差

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)5e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,ans;
int a[MAXN],fa[MAXN];

int cal(int a[],int sum=0) {
    stack<pair<int,int> >s;
    a[n+1]=1e8;
    s.push({0,1e9});
    for(int i=0;i<=n+1;i++) {
        while(a[i]>s.top().se) {
            auto p=s.top(); s.pop();
            auto p2=s.top(); sum+=p.se*(i-p.fi)*(p.fi-p2.fi);
        }
        s.push({i,a[i]});
    }
    return sum;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=read(); fa[i]=-a[i];
    }
    printf("%lld\n",cal(a)+cal(fa));
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day2 \#437. no crossing

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)103;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

vector<pair<int, int> > grap[MAXN];
int n, k, m, ans=INF;
int dp[MAXN][MAXN][MAXN][MAXN];

int f(int c, int s, int e, int t){
	if(~dp[c][s][e][t]) return dp[c][s][e][t];
	if(!t) return 0;
	int res = INF;
	for(auto j : grap[c]){
		if(j.se > c && j.se <= e){
			res = min(min(res, f(j.se, j.se, e, t-1) + j.fi), f(j.se, c+1, j.se, t-1) + j.fi);
		}
		if(j.se < c && j.se >= s){
			res = min(min(res, f(j.se, s, j.se, t-1) + j.fi), f(j.se, j.se, c-1, t-1) + j.fi);
		}
	}
	return dp[c][s][e][t] = res;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read()-1; m=read();
	for(int i=1; i<=m; i++) {
		int u=read(), v=read(), c=read();
		grap[u].push_back(mkp(c, v));
	}
	memset(dp, -1, sizeof(dp));
	for(int i=1; i<=n; i++) {
		ans = min(min(ans, f(i, i, n, k)), f(i, 1, i, k));
	}
    printf("%d\n",ans>1e8?-1:ans);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day3 \#451. Dis

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)2e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m;
int a[MAXN],pre[MAXN];
//Begin HLD 板子
int cnt,dep[MAXN],siz[MAXN],son[MAXN],top[MAXN],fa[MAXN],dfn[MAXN],rnk[MAXN];

vector<int> grap[MAXN];

int dfs1(int u) {
    son[u]=-1; siz[u]=1; dep[u]=dep[fa[u]]+1;
    pre[u]=pre[fa[u]]^a[u];
    for(auto v:grap[u]) {
        if(v==fa[u]) continue;
        fa[v]=u;  siz[u]+=dfs1(v);
        if(son[u]==-1 || siz[son[u]]<siz[v])
            son[u]=v;
    }
    return siz[u];
}

void dfs2(int u,int t) {
    top[u]=t;  dfn[u]=++cnt; rnk[cnt]=u;
    if (son[u] == -1) return;
    dfs2(son[u],t); 
    // 优先对重儿子进行 DFS，可以保证同一条重链上的点 DFS 序连续
    for(int v : grap[u]) {
        if(v!=fa[u] && v!=son[u])
            dfs2(v,v);
    }
}

int lca(int u, int v) {
    while (top[u] != top[v]) {
        if (dep[top[u]] > dep[top[v]]) u = fa[top[u]];
        else v = fa[top[v]];
    }
    return dep[u] > dep[v] ? v : u;
}
//End HLD 板子

int solve(int u,int v) {
    int c=lca(u,v);
    int f=fa[c];
    return (pre[u]^pre[f]^pre[c]^pre[v]);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    for(int u,v,i=1;i<n;i++) {
        grap[u=read()].pb(v=read());
        grap[v].pb(u); 
    }
    dfs1(1);  dfs2(1,1);
    while(m--) {
        printf("%d\n",solve(read(),read()));
    }
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day4 \#456. 选数

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)1e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n;
int a[MAXN],sum[MAXN];
map<int,int> mp;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=(read()+a[i-1])%n;
    }
    mp[0]=0;
    for(int i=1;i<=n;i++) {
        if(mp.count(a[i])) {
            printf("%d\n",i-mp[a[i]]);
            for(int j=mp[a[i]]+1;j<=i;j++) {
                printf("%d%c",j," \n"[j==i]);
            }
            return;
        }
        mp[a[i]]=i;
    }
    puts("-1");
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day5 \#452. 序列操作

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)1e6+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,q;
int a[MAXN];

struct Node {
    int lazy;
}tr[MAXN<<2];

void build(int nowl,int nowr,int rt) {
    // printf("%d %d %d\n",nowl,nowr,rt);
    if(nowl==nowr) {
        tr[rt].lazy=a[nowl];
        // printf("SET val:%d in rt:%d\n",tr[rt].lazy,rt);
        return;
    }
    int nowm=(nowl+nowr)>>1,rx=rt<<1;
    build(nowl,nowm,rx); build(nowm+1,nowr,rx|1);
}

void pushdown(int rt) {
    int rx=rt<<1;
    tr[rx].lazy=max(tr[rx].lazy,tr[rt].lazy);
    tr[rx|1].lazy=max(tr[rx|1].lazy,tr[rt].lazy);
    tr[rt].lazy=0;
}

void modify(int target,int nowl,int nowr,int rt,int val) {
    if(nowl>target || nowr<target) {
        return;
    }
    if(nowl==nowr) {
        tr[rt].lazy=val;
        return;
    }
    int nowm=(nowl+nowr)>>1,rx=rt<<1;
    pushdown(rt);
    modify(target,nowl,nowm,rx,val); modify(target,nowm+1,nowr,rx|1,val);
}

int query(int target,int nowl,int nowr,int rt) {
    if(nowl==nowr) {
        // printf("FIND val:%d in rt:%d\n",tr[rt].lazy,rt);
        return tr[rt].lazy;
    }
    int nowm=(nowl+nowr)>>1,rx=rt<<1;
    pushdown(rt);
    return nowm<target?query(target,nowm+1,nowr,rx|1):query(target,nowl,nowm,rx);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); q=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    build(1,n,1);
    // for(int i=1;i<=n;i++) {
    //     printf("%d%c",query(i,1,n,1)," \n"[i==n]);
    // }
    while(q--) {
        if(read()==1) {
            int x=read(),y=read();
            modify(x,1,n,1,y);
        } else {
            tr[1].lazy=max(tr[1].lazy,read());
        }
    }
    for(int i=1;i<=n;i++) {
        printf("%d%c",query(i,1,n,1)," \n"[i==n]);
    }
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day6 \#464. 数数

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)1e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,q;
int a[MAXN], b[MAXN], b_len;

struct ptree {
    int val, l, r;
} tree[MAXN * 24];
int root[MAXN], node_cnt;

void modify(int pre, int l, int r, int& now, int pos) {
    if(pos<l || pos>r) {
        return;
    } 
    tree[now = ++node_cnt] = {tree[pre].val + 1, tree[pre].l, tree[pre].r};
    if (l == r) {
        return;
    }
    int mid = (l+r)>>1;
    modify(tree[pre].l, l, mid, tree[now].l, pos); modify(tree[pre].r, mid + 1, r, tree[now].r, pos);
}

int query(int l, int r, int nowl, int nowr, int k) {
    int nowm=(nowl+nowr)>>1;
    return (nowl==nowr) ? (k>=nowl ? tree[r].val-tree[l].val : 0) : ((nowm>k) ? query(tree[l].l,tree[r].l,nowl,nowm,k) : (nowm==k ? tree[tree[r].l].val-tree[tree[l].l].val : tree[tree[r].l].val-tree[tree[l].l].val+query(tree[l].r,tree[r].r,nowm+1,nowr,k)));
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); q=read();
    for(int i=1;i<=n;i++) {
        b[i]=a[i]=read();
    }    
    sort(b+1,b+n+1);
    b_len = unique(b+1,b+n+1)-b-1;
    for(int i=1;i<=n;i++) {
        modify(root[i-1],1,b_len,root[i],lower_bound(b+1,b +b_len+1,a[i])-b);
    }
    for(int i=1;i<=q;i++) {
        int l=read(),r=read(),h=read();
        printf("%d%c",query(root[l-1],root[r],1,b_len,upper_bound(b+1,b+b_len+1,h)-b-1)," \n"[i==q]);
    }
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
        if(CASE==T) {
            break;
        }
        node_cnt=0; mmst0(root);
    }
    return 0;
}
```

# Day7 \#454. Minimum Or Spanning Tree

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)4e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m;
int fa[MAXN];
struct Edge {
    int u,v,w;
} e[MAXN];

int findx(int x) {
    return x==fa[x] ? x : fa[x]=findx(fa[x]);
}

bool merge(int u,int v) {
    u=findx(u),v=findx(v);
    return u==v ? false : fa[u]=v;
}

int chk(int mask) {
    for(int i=1;i<=n;i++) fa[i] = i;
    int size = n;
    for(int i=1;i<=m;i++) {
        if ((e[i].w | mask) == mask && merge(e[i].u, e[i].v)) {
            size--;
        }
    }
    return size == 1;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int u,v,w,i=1;i<=m;i++) {
        e[i].u=read(); e[i].v=read(); e[i].w=read();
    }
    int ans=(1<<30)-1;
    for(int i=29;i>=0;i--) {
        ans ^= (1 << i);
        if (!chk(ans)) ans ^= (1 << i);
    }
    printf("%lld\n",ans);
    return;
}
//考虑每一位的贡献，从高到低用并查集判断在某一位全部为0时是否能够组成一棵树。如果可以，则禁用此位为1的所有边，继续向下查找。
//用并查集判断是否可以构成树（联通），如果所有节点的父亲节点相同，则图联通。
signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day8 \#466. 摘桃子

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)2e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,k,ans;
int a[MAXN];
map<int,int> mp;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read();
    for(int i=1;i<=n;i++) {//先a[i] -= 1再前缀和跟先前缀和再把每个前缀和都 -i 等价，群友 NB
        a[i]=(read()-1+a[i-1])%k;
    }
    // for(int i=1;i<=n;i++) printf("%lld%c",sum[i]," \n"[i==n]);
    for(int i=0;i<=min(k-1,n);i++) { // for i in len
        ans+=mp[a[i]];
        mp[a[i]]++;
    }
    for(int i=min(k-1,n)+1;i<=n;i++) {
        mp[a[i-k]]--;
        ans+=mp[a[i]];
        mp[a[i]]++;
    }
    // for(int i=1;i<=n;i++) {
    //     mp[sum[i]]++;
    //     for(int j=i;j<=n;j++) {
    //         // printf("DBG: %lld %lld SUM:%lld\n",i,j,sum[j]-sum[i-1]);
    //         if((sum[j]-sum[i-1]+k)%k==j-i+1) {
    //             ans++;
    //             // printf("ANS+: %lld %lld\n",i,j);
    //         }
    //     }
    // }
    printf("%lld\n",ans);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day9 \#467. 路径计数2

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)1e6+3,MOD=(int)1e9+7;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m;
int x[MAXN],y[MAXN],dp[MAXN];

// 组合数板子
#define mod MOD
ll fac[MAXN<<1],inv[MAXN<<1];
ll pow_mod(ll a,ll n) {
    ll ret =1;
    while(n) {
        if(n&1) ret=ret*a%mod;
          a=a*a%mod;
          n>>=1;
    }
    return ret;
}

void init() {
    fac[0]=1;
    for(int i=1;i<MAXN<<1;i++) {
        fac[i]=fac[i-1]*i%mod;
    }
}

ll Cc(ll x, ll y) {
    return fac[x]*pow_mod(fac[y]*fac[x-y]%mod,mod-2)%mod;
}
#undef mod
// 组合数板子

int dfs(int i) {
	if (dp[i]) return dp[i];
	int res=0;
	for (int j=1;j<=m+1;j++) {
		if (j!=i && x[j]<=x[i] && y[j]<=y[i]) {
			res=(res+(dfs(j)*Cc(x[i]-x[j]+y[i]-y[j],x[i]-x[j]))%MOD)%MOD;
		}
	}
	return dp[i]=(Cc(x[i]-1+y[i]-1,x[i]-1)-res+MOD)%MOD;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1;i<=m;i++) {
        x[i]=read(); y[i]=read(); 
    }
    x[m+1]=y[m+1]=n;
    dfs(m+1);
    printf("%lld\n",dp[m+1]);
    return;
}

signed main() {
    init();
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day10 \#468. 函数求和

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS printf("Yes\n")
#define NOO printf("No\n")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)1e5+3,MOD=998244353;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,k,ans;
int a[MAXN];

int qpw(int a,int b) {
    int res=1;
    while(b) {
        if(b&1) {
            res=(res*a)%MOD;
        }
        b>>=1;
        a=(a*a)%MOD;
    }
    return res;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read(); bitset<64>b; 
    for(int i=1;i<=n;i++) {
        bitset<64> a(read());
        int cnt1=0,cnt0=0;
        for(int j=0;j<k;j++) {
            cnt1+=((!b[j]) && a[j]); // if(b[j]==0 && a[j]==1)cnt1++;
            cnt0+=(!(b[j] || a[j])); // if(b[j]==0 && a[j]==0)cnt0++;
        }
        if(cnt1) {
            ans=(ans+i*(qpw(2,cnt1)-1+MOD)%MOD*(qpw(2,cnt0)%MOD)%MOD)%MOD;
            // 加入 a[i] 的贡献 ((2^cnt1-1)*(2^cnt2)个数会选中 a[i] )
        }
        b|=a; // mask掉已经用过的位
    }
    printf("%lld\n",ans);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}

//没想出来，看了下面裙友题解才写出来的
// https://zhuanlan.zhihu.com/p/476870600
// a[i] , x , a[i]&x
// 0    , 0 , 0
// 0    , 1 , 0
// 1    , 0 , 0
// 1    , 1 , 1
// 仅在 a[i]==1 && x==0 时 a[i]&x！=a[i]
```