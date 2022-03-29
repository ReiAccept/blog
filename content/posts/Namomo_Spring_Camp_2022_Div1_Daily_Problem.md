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

# Day11 \#497. XOR Inverse

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(x) emplace_back(x)
#define sz(x) ((int)x.size())
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
const int MAXN=(int)3e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,ans,x;
int a[MAXN],st[MAXN];
int cnt[40][2];
vector<int> vec;

void solve(vector<int> vec,int p) {
    if(p==-1||vec.empty()) {
        return;
    }
    vector<int> tmp[2];
    for(auto x:vec) {
        tmp[a[x]>>p&1].pb(x);
    }
    ll sum=0;
    for(int i=0,j=0;i<sz(tmp[0]);i++) {
        while(j<sz(tmp[1])&&tmp[0][i]>tmp[1][j]) ++j;
        sum+=j;
    }
    cnt[p][0]+=sum;
    cnt[p][1]+=1ll*sz(tmp[0])*sz(tmp[1])-sum;
    solve(tmp[0],p-1); solve(tmp[1],p-1);
}    

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    for(int i=1;i<=n;i++) {
        vec.pb(i);
    }
    solve(vec,30);
    for(int i=30;~i;i--) {
        ans+=min(cnt[i][0],cnt[i][1]);
        if(cnt[i][1]<cnt[i][0]) x|=1<<i;
    }
    printf("%lld %lld\n",ans,x);
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

# Day12 \#469. Closest Equals

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
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
const int MAXN=(int)5e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m;
int a[MAXN],l[MAXN],r[MAXN],ans[MAXN],ord[MAXN],tr[MAXN];
map<int,int> mp;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    // int j,k,t;
    memset(tr,3,sizeof(tr));
    n=read(); m=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    for(int i=0;i<m;i++) {
        ord[i]=i;
        l[i]=read(); r[i]=read();
    }
    sort(ord,ord+m,[](const int &xx,const int &yy) {
        return r[xx]<r[yy];
    });
    for(int i=0,j=1;i<m;i++) {
        int t=ord[i];
        while(j<=r[t]) {
            if(mp.count(a[j])) {
                for(int k=mp[a[j]];k;k-=k&-k) {
                    tr[k]=min(tr[k],j-mp[a[j]]);
                }
            }
            mp[a[j]]=j;
            j++;
        }
        ans[t]=1e6;
        for(int k=l[t];k<=n;k+=k&-k) {
            ans[t]=min(ans[t],tr[k]);
        }
    }
    for(int i=0;i<m;i++) {
        printf("%d\n",ans[i]==1e6?-1:ans[i]);
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

# Day13 \#380. CCPC Harbin 2021 G, Damaged Bicycle

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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
const int MAXN=(int)1e6+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

struct node{int to,w;};
vector <node> mp[MAXN];

inline bool operator < (node a,node b){return a.w>b.w;}
inline bool operator > (node a,node b){return a.w<b.w;}
priority_queue <node> q;

int n,m,t,r,k,A[MAXN],d[25][MAXN],id[MAXN],dp[MAXN][25],ct[MAXN];
bool vis[25][MAXN];
double DP[MAXN][25],P[MAXN];

inline void dij(int id,int uu) {
    for(int i=1;i<=n;i++) {
        d[id][i]=INF; 
    }
    q.push({uu,0}); 
    d[id][uu]=0;
    while(!q.empty()) {
        node u=q.top(); q.pop();
        if(vis[id][u.to]) {
            continue;
        }
        d[id][u.to]=u.w;  vis[id][u.to]=1;
        for(auto v : mp[u.to]) {
            if(d[id][v.to]>d[id][u.to]+v.w) {
                d[id][v.to]=d[id][u.to]+v.w;
                q.push({v.to,d[id][v.to]});
            }
        }
    }
}

inline double DFS(int sta,int u) {
    if(DP[sta][u]) return DP[sta][u];
    double tmp=1.0*P[u]*d[u][n]/t+(1-P[u])*d[u][n]/r;
    for(int i=1;i<=k;i++) {
        if(sta&(1<<(i-1))) continue;
        tmp=min(tmp,1.0*(1-P[u])*d[u][n]/r+P[u]*(1.0*d[u][A[i]]/t+DFS(sta|(1<<(i-1)),i)));
    }
    return DP[sta][u]=tmp;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    t=read(); r=read(); n=read(); m=read();
    for(int i=1;i<=m;i++) {
        int u=read(),v=read(),w=read();
        mp[u].pb((node){v,w}); mp[v].pb((node){u,w});
    }
    k=read();
    for(int i=1;i<=k;i++) A[i]=read(),P[i]=read()/100.0,dij(i,A[i]),id[A[i]]=i;
    dij(19,1); dij(20,n); P[19]=1;
    if(d[19][n]==INF) {
        puts("-1"); 
        return;
    }
    DFS(0,19); 
    int ed=(1<<k)-1;
    printf("%.6f\n",DP[0][19]);
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

# Day14 \#501. 拆方块

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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
const int MAXN=(int)1e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,ans;
int l[100005],r[100005],h[100005];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read()+1;
    for(int i=1;i<n;i++) {
        h[i]=read();
    }
    for(int i=1;i<n;i++) {
        l[i]=l[i-1]+1;
        if(l[i]>h[i]) {
            l[i]=h[i];
        }
    }
    for(int i=n-1;i;i--) {
        r[i]=r[i+1]+1;
        if(r[i]>h[i]) {
            r[i]=h[i];
        }
    }
    for(int i=1;i<n;i++) {
        ans=max(ans,min(l[i],r[i]));
    }
    printf("%d\n",ans);
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

# Day15 [#504. 连续子序列](http://oj.daimayuan.top/problem/504)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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

int n,ans,ansi;
map<int,int> f;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int x,i=1;i<=n;i++) {
        f[x]=max(f[x],f[(x=read())-1]+1);
    }
    for(auto x:f) {
        if(x.se>ans) {
            ans=x.se;
            ansi=x.fi;
        }
    }
    printf("%lld\n",ans);
    for(int i=ansi-ans+1;i<=ansi;i++) {
        printf("%d%c",i," \n"[i==ansi]);
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

# Day16 [#503. 工作安排](http://oj.daimayuan.top/problem/503)

正解写不对遂弃疗

原题找了个树状数组的写法

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;
inline int read()
{
    char ch=getchar();
    int res=0,flag=1;
    while(ch<'0'||ch>'9')
    {
        if(ch=='-')
            flag=-1;
        ch=getchar();
    }
    while(ch>='0'&&ch<='9')
    {
        res=res*10+ch-'0';
        ch=getchar();
    }
    return res*flag;
}
int n;
struct work
{
    int w;
    int t;
    bool operator <(work x2)
    {
        return w>x2.w;
    }
}x[100001];
int c[100001];
ll ans;
inline int lowbit(int a)
{
    return a&(-a);
}
inline void update(int pos,int v)
{
    while(pos<=n)
    {
        c[pos]+=v;
        pos+=lowbit(pos);
    }    
}
inline int sum(int pos)
{
    int res=0;
    while(pos)
    {
        res+=c[pos];
        pos-=lowbit(pos);
    }
    return res;
}
int main()
{
    n=read();
    for(int i=1;i<=n;++i)
    {
        x[i].t=min(read(),(int)1e5);
        x[i].w=read();
    }
    sort(x+1,x+n+1);
    for(int i=1;i<=n;++i)
        if(sum(x[i].t)!=x[i].t)
        {
            int l=1,r=x[i].t,mid,res;
            while(l<=r)
            {
                mid=(l+r)>>1;
                if(sum(x[i].t)-sum(mid-1)!=x[i].t-mid+1)
                {
                    res=mid;
                    l=mid+1;
                }
                else
                    r=mid-1;
            }
            update(res,1);
            ans+=x[i].w;
        }
    printf("%lld\n",ans);
    return 0;
}
```

# Day17 [#505. 三角果计数](http://oj.daimayuan.top/problem/505)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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
const int MAXN=(int)1e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,ans;
int len[MAXN];
vector<int> grap[MAXN];

void dfs(int u, int fa) {
    for (auto v : grap[u]) {
        if (v != fa) {
            dfs(v, u);
            ans += len[u] * len[v] * (n - len[v] - len[u] - 1);
            len[u] += len[v];
        }
    }
    len[u]++;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for (int u,v,w,i = 1; i < n; i ++) {
        grap[u=read()].push_back(v=read());
        grap[v].push_back(u);
        w=read();
    }
    dfs(1, INF);
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
//https://zhuanlan.zhihu.com/p/480494165
```

# Day18 [#555. 整齐的数组2](http://oj.daimayuan.top/problem/555)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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

int n;
int a[43];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    sort(a+1,a+1+n);
    int cnt = 1;
    for(int i=2;i<=n;i++) {
        if(a[i]==a[i-1]) cnt++;
        else cnt = 1;
        if(cnt >= n/2) {
            cout<<"-1\n";
            return ;
        }
    }
    int res = 0;
    for(int i=1;i<=n;i++) {
        map<int ,int >mp;
        cnt = 0;
        for(int j=1;j<=n;j++) {
            int x = abs(a[j]-a[i]);
            if(a[i]==a[j]) {
                cnt ++ ;
                continue;
            }
            for(int k=1;k*k<=x;k++) {
                if(x % k==0) {
                    if(k*k==x) mp[k]++;
                    else mp[x/k]++,mp[k]++;
                }
            }
        }
        for(auto i : mp) {
            if(i.se + cnt >= n/2) {
                res = max(res,i.fi);
            }
        }
    }
    printf("%d\n",res);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
```

# Day19 [#556. 三进制循环](http://oj.daimayuan.top/problem/556)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
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
const int MAXN=(int)5e5+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

vector<int> grap[MAXN];
int n,ans;
int a[MAXN];
int dp[MAXN][2];

void dfs(int u,int fa) {
    dp[u][0]=dp[u][1]=1; // 初始赋值1
    for (int v : grap[u]) {
        if(v==fa) {
            continue;
        }
        dfs(v, u);
        if((a[u]+1)%3==a[v]) {
            dp[u][0]=max(dp[u][0],dp[v][0]+1); // 递增
        }
        if((a[v]+1)%3==a[u]) {
            dp[u][1]=max(dp[u][1],dp[v][1]+1); // 递减
        }
    }
    ans = max(ans, dp[u][0] + dp[u][1] - 1);//记得减1
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int u,v,i=1;i<n;i++) {
        grap[u=read()].pb(v=read());
        grap[v].pb(u);
    }
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    dfs(1,0);
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

// https://zhuanlan.zhihu.com/p/481678880 严格鸽，我滴超人
```

# Day20 [#559. 树上逆序对](http://oj.daimayuan.top/problem/559)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define lowbit(x) (-x&x)
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

int n;
int s[MAXN],res[MAXN];
PII a[MAXN];

void update(int x) {
    for(int i=x;i<=n;i+=lowbit(i)) {
        s[i]++;
    }
}

int query(int x,int res=0){
    for (int i=x;i!=0;i-=lowbit(i)) {
        res+=s[i];
    }
    return res;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i].fi=read(),a[i].se = i;
    }
    sort(a+1,a+1+n);
    for(int i=1;i<=n;i++) {
        for (int j=1;j<n;j++) {
            int l=(a[i].se-1)*j+2,r=min(j*a[i].se+1,n);
            if(l>r) {
                break;
            }
            res[j]+=(query(r)-query(l-1));
        }
        update(a[i].se);
    }
    for(int i=1;i<n;i++) {
        printf("%d%c",res[i]," \n"[i==(n-1)]);
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

# Day21 [#560. 约分](http://oj.daimayuan.top/problem/560)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
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

int ans1,ans2,r1,r2;
string s,t;
int cnt[10];

bool find(string &s,string &t)
{
    int n=sz(s),m=sz(t),i=0;
    for(auto c:t)
    {
        while (i<n&&s[i]!=c) {
            cnt[s[i++]-'0']--;
        }
        if (i==n) {
            return false;
        }
        i++;
    }
    while(i<n) {
        cnt[s[i++]-'0']--;
    }
    for (int i=0;i<10;i++) {
        if (cnt[i]) {
            return false;
        }
    }
    return true;
}
void work(int CASE,bool FINAL_CASE)
{
    cin>>s>>t;
    int n=sz(s),m=sz(t);
    for (auto &x:s) {
        r1=r1*10+(x-'0');
    }
    for (auto &x:t) {
        r2=r2*10+(x-'0');
    }
    int ans1=r1,ans2=r2,now=__gcd(r1,r2);
    r1/=now; r2/=now;
    for (int j=0;j<1<<n;j++)
    {
        int r3=0,ctt=0;
        mmst0(cnt);
        for (int i=0;i<n;i++) {
            if (j>>i&1) {
                r3=r3*10+s[i]-'0';
            } else {
                cnt[s[i]-'0']++;
                ctt++;
            }
        }
        if (r3%r1||!r3||(__int128)r3/r1*r2>=1llu<<63) {
            continue;
        }
        ll r4=r3/r1*r2;
        string tar=to_string(r4);
        while (tar.size()+ctt<m) {
            tar='0'+tar;
        }
        if (r3<ans1&&find(t,tar)) {
            ans1=r3,ans2=r4;
        }
    }
    cout<<ans1<<' '<<ans2<<endl;

}

signed main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
    }
    return 0;
}
//nmd,wsm 又是一个我在赛场上没出的题，当时这题甚至没开没看题意
```

# Day22 [#562. 蜗蜗的数列](http://oj.daimayuan.top/problem/562)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("Yes")
#define NOO puts("No")
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

int n,q,mod,cnt;
int v[MAXN],fib[MAXN];

void upd(int pos,int val){
    if(pos<n && v[pos]==0) {
        cnt--;
    }
    v[pos]=(v[pos]+val)%mod;
    if(pos<n && v[pos]==0) {
        cnt++;
    }
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    cnt=n=read(); q=read(); mod=read();
    fib[0]=fib[1]=1%mod;
    for(int i=2;i<MAXN;i++) {
        fib[i]=(fib[i-1]+fib[i-2])%mod;
    }
    for(int a,i=0;i<n;i++) {
        a=read();
        upd(i,a); upd(i+1,-a); upd(i+2,-a);
    }    
    for(int b,i=0;i<n;i++) {
        b=read();
        upd(i,-b); upd(i+1,b); upd(i+2,b);
    }
    for(int l,r,val,i=1;i<=q;i++) {
        char c=nc(); l=read()-1; r=read()-1;
        val=(c=='A'?1:-1);
        upd(l,val*fib[0]); upd(r+1,-val*fib[r+1-l]); upd(r+2,-val*fib[r-l]);
        puts(n==cnt?"Yes":"No");
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

# Day23 [#131. 最大公约数](http://oj.daimayuan.top/problem/131)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)2e3+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m,mx1,sum;
int a[MAXN],mx[MAXN],t[MAXN*10],b[MAXN];;

void calc(int q,int mo) {
    sum=0,mx1=1;
    for(int j=1;j<=n;j++) {
        b[j]=a[j]-a[j]/mo*mo;
    }
    sort(b+1,b+1+n);
    for(int j=1;j<=q;j++) {
        if(b[j]!=b[j-1]) {
            mx1=max(mx1,sum);
            sum=1;
        } else {
            sum++;
        }
    }
    mx[mx1]=max(mx[mx1],mo);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=a[i-1]+read();
    }
    mx[1]=m=a[n];
    b[0]=b[n+1]=-1;
    for(int i=1;i<=sqrt(m);i++) {
        if(m%i==0) {
            calc(n+1,i);
            calc(n,m/i);
        }
    }
    for(int i=n;i>=1;i--) {
        mx[i]=max(mx[i],mx[i+1]);
    }
    for(int i=1;i<=n;i++) {
        printf("%lld\n",mx[i]);
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

# Day24 [#607. 平方计数](http://oj.daimayuan.top/problem/607)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
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

int n,ans;
int a[MAXN],cot[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for (int i=1;i<=n;i++) {
        cot[a[i]=read()]++;
    }
    for (int i=1;i<=MAXN;i++) {
        for (int j=i;j<=MAXN;j+=i) {
            int mi=min(j/i,i),mx=max(j/i,i);
            int d=mx-mi;
            if (!(d%2)) {
                ans+=cot[j]*cot[d>>1];
            }
        }
    }
    printf("%lld\n",ans>>1);
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

# Day25 [#608. 字典序最小](http://oj.daimayuan.top/problem/608)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
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

int n,k,cnt;
bool instk[MAXN];
int last[MAXN],a[MAXN],ans[MAXN];
stack<int> stk;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read();
    for (int i = 1; i <= n; i++) {
        last[a[i]=read()]=i;
    } 
    for (int i = 1; i <= n; i++) {
        if(!instk[a[i]]) {
            while (stk.size() && stk.top() > a[i] && last[stk.top()] > i) {
                instk[stk.top()]=false;
                stk.pop();
            }
            stk.push(a[i]);
            instk[a[i]]=true;
        }

    }
    while (!stk.empty()) {
        ans[++cnt]=stk.top();
        stk.pop();
    }

    for(int i=cnt;i>=1;i--) {
        printf("%d%c",ans[i]," \n"[i==1]);
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

# Day26 [#611. 拆拆](http://oj.daimayuan.top/problem/611)

不会，弃疗

# Day27 [#614. “Z”型矩阵](http://oj.daimayuan.top/problem/614)

```cpp
// 原题 https://codeforces.com/contest/628/problem/E
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
using namespace std;
// using namespace __gnu_pbds; // If using pbds don't using std!
typedef long long ll;
// typedef long double rld; // use double pls!
typedef unsigned long long ull;

const double eps = 1e-6;
const int INF=0x3f3f3f3f;//0x3f3f3f3f3f3f3f3f; // LLINF
const int MAXN=(int)3e3+3;

inline char nc(){static char buf[100000],*p1=buf,*p2=buf;return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;}
inline int read(){int s=0,w=1;char ch=nc();while(!isdigit(ch)){if(ch=='-')w=-1;ch=nc();}while(isdigit(ch)){s=(s<<3)+(s<<1)+(ch^48);ch=nc();} return s*w;}
//inline int read() {int x;si(x);return x;} // FAKE QUICK READ,JUST FOR DEBUG
// inline void read(int &x){char ch=nc();x=0;while (!(ch>='0'&&ch<='9')) ch=nc();while (ch>='0'&&ch<='9') x=(x<<3)+(x<<1)+ch-48,ch=nc();} // 根据参数个数自动选择
// void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n,m,ans; 
bitset<MAXN> a[MAXN], b[MAXN], c[MAXN];
char s[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    // n=read(); m=read();
    scanf("%lld%lld",&n,&m);
    for(int i = 0; i < n; i++){
        scanf("%s", s);
        for(int j = 0; j < m; j++)
            a[i][j] = (s[m-1-j] == 'z');
        b[i].set(); c[i].set();
    }
    for(int k = 0; k < m && k < n; k++){
        for(int i = 0; i < n; i++)
            b[i] &= a[i] >> k;
        for(int i = 0; i + k < n; i++){
            c[i] &= a[i+k] >> k;
            ans += (b[i] & b[i+k] & c[i]).count();
        }
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
```

# Day28 [#613. 好序列](http://oj.daimayuan.top/problem/613)

```cpp
#include<bits/stdc++.h>
// #include<bits/extc++.h>
// #define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("non-boring")
#define NOO puts("boring")
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

int n;
int a[MAXN],pre[MAXN],nxt[MAXN];

bool chk(int l,int r) {
    if(l>=r) {
        return true;
    }
    int x=l,y=r;
    while(x<=y) { // 启发式合并
        if(pre[x]<l && r<nxt[x]) {
            return (chk(l,x-1) && chk(x+1,r));
        }
        x++;
        if(pre[y]<l && r<nxt[y]) {
            return (chk(l,y-1) && chk(y+1,r));
        }
        y--;
    }
    return false;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); map<int,int> mp;
    for(int i=1;i<=n;i++) {
        pre[i]=-1; nxt[i]=n+1;
    }
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    for(int i=1;i<=n;i++) {
        pre[i]=mp[a[i]];
        nxt[mp[a[i]]]=i;
        mp[a[i]]=i;
    }
    if(chk(1,n)) {
        YESS;
    } else {
        NOO;
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
        if(CASE!=T) { }
    }
    return 0;
}
```

# Day29 [#606. 社交圈](http://oj.daimayuan.top/problem/606)

```
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("YES")
#define NOO puts("NO")
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

int n,ans;
int l[MAXN],r[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        l[i]=read(); r[i]=read();
    }
    sort(l+1,l+1+n);
    sort(r+1,r+1+n);
    for(int i=1;i<=n;i++) {
        ans+=max(l[i],r[i]);
    }
    printf("%lld\n",ans+n); // +n 包括自己的椅子
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
        if(CASE!=T) {}
    }
    return 0;
}

// 草，是若干个圈
// 开始以为只有一个圈
```

# Day30 [#609. 区间和](http://oj.daimayuan.top/problem/609)

```
#include<bits/stdc++.h>
// #include<bits/extc++.h>
#define int long long//__int128
#define mmst0(x) memset(x,0,sizeof(x))
#define mmst3f(x) memset(x,0x3f,sizeof(x))
#define si(x) scanf("%d",&x)//scanf("%lld",&x) // When define int ll
#define pb(...) emplace_back(__VA_ARGS__)
#define sz(x) ((int)(x.size()))
#define PII pair<int,int>
#define mkp(x, y) make_pair(x, y)
#define fi first
#define se second
#define YESS puts("Yes")
#define NOO puts("No")
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

int n,q;
int fa[MAXN];

int findx(int x) {
    return x==fa[x]?x:fa[x]=findx(fa[x]);
}

void merge(int x,int y) {
    fa[findx(x)]=findx(y);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); q=read();
    for(int i=1;i<=n;i++) {
        fa[i]=i;
    }
    while(q--) {
        int l=read(),r=read();
        merge(l-1,r);
    }
    if(findx(0)==findx(n)) {
        YESS;
    } else {
        NOO;
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
        if(CASE!=T) {}
    }
    return 0;
}
```

# Day31 [#618. 选数2](http://oj.daimayuan.top/problem/618)

```cpp

```