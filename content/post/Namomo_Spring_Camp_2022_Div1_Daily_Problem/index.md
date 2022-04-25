---
title: "Namomo Spring Camp 2022 Div1 每日一题"
date: 2022-03-07T20:18:28+08:00
math: true
tags: ["算法竞赛"]
categories: ["XCPC"]
# image: https://nwzimg.wezhan.cn/contents/sitefiles2048/10243973/images/23753065.jpg
# image: "wls.jpg"
image: "https://api.ixiaowai.cn/api/api.php"
description: "预计会周更题解（不排除我会咕咕的可能性）"
---

> 配合食用的起手板 https://github.com/ACRei/Algorithm/blob/master/DefaultCode.cpp

## Day1 P436. 子串的最大差

```cpp
const int MAXN=(int)5e5+3;

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
```

## Day2 P437. no crossing

```cpp
const int MAXN=(int)103;

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
```

## Day3 P451. Dis

```cpp
const int MAXN=(int)2e5+3;

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
```

## Day4 P456. 选数

```cpp
const int MAXN=(int)1e5+3;

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
```

## Day5 P452. 序列操作

```cpp
const int MAXN=(int)1e6+3;

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
```

## Day6 P464. 数数

```cpp
const int MAXN=(int)1e5+3;

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

## Day7 P454. Minimum Or Spanning Tree

```cpp
const int MAXN=(int)4e5+3;

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

```

## Day8 P466. 摘桃子

```cpp
const int MAXN=(int)2e5+3;

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
```

## Day9 P467. 路径计数2

```cpp
const int MAXN=(int)1e6+3,MOD=(int)1e9+7;

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

## Day10 P468. 函数求和

```cpp
const int MAXN=(int)1e5+3,MOD=998244353;

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



//没想出来，看了下面裙友题解才写出来的
// https://zhuanlan.zhihu.com/p/476870600
// a[i] , x , a[i]&x
// 0    , 0 , 0
// 0    , 1 , 0
// 1    , 0 , 0
// 1    , 1 , 1
// 仅在 a[i]==1 && x==0 时 a[i]&x！=a[i]
```

## Day11 P497. XOR Inverse

```cpp
const int MAXN=(int)3e5+3;

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
```

## Day12 P469. Closest Equals

```cpp
const int MAXN=(int)5e5+3;

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
```

## Day13 P380. CCPC Harbin 2021 G, Damaged Bicycle

```cpp
const int MAXN=(int)1e6+3;

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
```

## Day14 P501. 拆方块

```cpp
const int MAXN=(int)1e5+3;

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
```

## Day15 [P504. 连续子序列](http://oj.daimayuan.top/problem/504)

```cpp
const int MAXN=(int)2e5+3;

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
```

## Day16 [P503. 工作安排](http://oj.daimayuan.top/problem/503)

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

## Day17 [P505. 三角果计数](http://oj.daimayuan.top/problem/505)

```cpp
const int MAXN=(int)1e5+3;

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


//https://zhuanlan.zhihu.com/p/480494165
```

## Day18 [P555. 整齐的数组2](http://oj.daimayuan.top/problem/555)

```cpp
const int MAXN=(int)2e5+3;

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

## Day19 [P556. 三进制循环](http://oj.daimayuan.top/problem/556)

```cpp
const int MAXN=(int)5e5+3;

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



// https://zhuanlan.zhihu.com/p/481678880 严格鸽，我滴超人
```

## Day20 [P559. 树上逆序对](http://oj.daimayuan.top/problem/559)

```cpp
const int MAXN=(int)2e5+3;

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
```

## Day21 [P560. 约分](http://oj.daimayuan.top/problem/560)

```cpp
const int MAXN=(int)1e5+3;

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

## Day22 [P562. 蜗蜗的数列](http://oj.daimayuan.top/problem/562)

```cpp
const int MAXN=(int)1e6+3;

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
```

## Day23 [P131. 最大公约数](http://oj.daimayuan.top/problem/131)

```cpp
const int MAXN=(int)2e3+3;

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
```

## Day24 [P607. 平方计数](http://oj.daimayuan.top/problem/607)

```cpp
const int MAXN=(int)1e6+3;

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
```

## Day25 [P608. 字典序最小](http://oj.daimayuan.top/problem/608)

```cpp
const int MAXN=(int)1e5+3;

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
```

## Day26 [P611. 拆拆](http://oj.daimayuan.top/problem/611)

不会，只拿了42分，弃疗

```cpp
//2020420 贴一个不是我的代码，这位帮我 debug 后过了
const int N=2e6+5;
int pre[N],vis[N];
int cnt=1;
void get_pri() {
	f(i,2,1e6+5) {
		if(!vis[i])pre[cnt++]=i;
		for(int j=i+i;j<=1e6+6;j=j+i) vis[j]=1;
	}
}
int x,k;
int ans[N];
const int mod=1e9+7;
int power(int a,int b) {
	int ans1=1;
	while(b) {
		if(b&1) ans1=ans1*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans1;
}
int jc[N];
void get_jc() {
	int now=1;
	jc[0]=1;
	f(i,1,1e6)
	{
		now=now*i%mod;
		jc[i]=now;
	}
}
int C(int a,int b) {
	return jc[a]*power(jc[a-b],mod-2)%mod*power(jc[b],mod-2)%mod;
}
int p[N],m,c[N];
void divide(int n) {
	m=0;
	f(i,2,sqrt(n)) {
		if(n%i==0) {
			p[++m]=i,c[m]=0;
			while(n%i==0)n/=i,c[m]++;
		}
	}
	if(n>1)p[++m]=n,c[m]=1;
}
inline void solve() {
	scanf("%lld%lld",&x,&k);
	int temp=x;
	divide(x);
	int ansi=1;
	f(i,1,m) {
		if(!c[i])continue;
		ansi=(ansi*C(c[i]+k-1,k-1))%mod;
	}
	ansi=ansi*power(2,k-1)%mod;
	printf("%lld\n",ansi);
	return;
}
```

## Day27 [P614. “Z”型矩阵](http://oj.daimayuan.top/problem/614)

```cpp
const int MAXN=(int)3e3+3;

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
```

## Day28 [P613. 好序列](http://oj.daimayuan.top/problem/613)

```cpp
const int MAXN=(int)2e5+3;

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

## Day29 [P606. 社交圈](http://oj.daimayuan.top/problem/606)

```cpp
const int MAXN=(int)1e5+3;

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

// 草，是若干个圈
// 开始以为只有一个圈
```

## Day30 [P609. 区间和](http://oj.daimayuan.top/problem/609)

```cpp
const int MAXN=(int)2e5+3;

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
```

## Day31 [P618. 选数2](http://oj.daimayuan.top/problem/618)

```cpp
const int MAXN=(int)2e5+3;

int n,p,q,maxx,cans=0;
int pre[MAXN],ans[MAXN];
PII a[MAXN];

// ===================================================================================================================
// Seg Tree 板子
struct Node{
    int val,add,mul=1;
} t[MAXN<<2];

// int a[100003];

void build_t(int root,int l,int r)
{
    t[root].mul=1,t[root].add=0;
    if(l==r) t[root].val=0; //本题修改的地方,val=0 打标记用
    else
    {
        int m=(l+r)>>1,rx=root<<1;
        build_t(rx,l,m);
        build_t(rx+1,m+1,r);
        t[root].val=(t[rx].val+t[rx+1].val);
    }
}

void push_down(int root,int l,int r)
{
    int m=(l+r)>>1,rx=root<<1;
    t[rx].val=(t[rx].val*t[root].mul+t[root].add*(m-l+1));
    t[rx+1].val=(t[rx+1].val*t[root].mul+t[root].add*(r-m));//!!!!!!!!!!!!!!!!!!rx+1

    t[rx].mul=(t[rx].mul*t[root].mul);
    t[rx+1].mul=(t[rx+1].mul*t[root].mul);

    t[rx].add=(t[rx].add*t[root].mul+t[root].add);
    t[rx+1].add=(t[rx+1].add*t[root].mul+t[root].add);

    t[root].mul=1,t[root].add=0;
}

void up1(int root,int nowl,int nowr,int l,int r,ll k)
{
    if(r<nowl || nowr<l) return;
    if(l<=nowl && nowr<=r)
    {
        t[root].val=(t[root].val*k);
        t[root].mul=(t[root].mul*k);
        t[root].add=(t[root].add*k);
        return;
    }
    push_down(root,nowl,nowr);
    int m=(nowl+nowr)>>1,rx=root<<1;
    up1(rx,nowl,m,l,r,k);
    up1(rx+1,m+1,nowr,l,r,k);
    t[root].val=(t[rx].val+t[rx+1].val);
}

void up2(int root,int nowl,int nowr,int l,int r,ll k)
{
    if(r<nowl || nowr<l) return;
    if(l<=nowl && nowr<=r)
    {
        t[root].add=(t[root].add+k);
        t[root].val=(t[root].val+k*(nowr-nowl+1));
        return;
    }
    push_down(root,nowl,nowr);
    int m=(nowl+nowr)>>1,rx=root<<1;
    up2(rx,nowl,m,l,r,k);
    up2(rx+1,m+1,nowr,l,r,k);
    t[root].val=(t[rx].val+t[rx+1].val);
}

ll query(int root,int nowl,int nowr,int l,int r)
{
    if(r<nowl || nowr<l) return 0;
    if(l<=nowl && nowr<=r) return t[root].val;
    push_down(root,nowl,nowr);
    int m=(nowl+nowr)>>1,rx=root<<1;
    return (query(rx,nowl,m,l,r)+query(rx+1,m+1,nowr,l,r)); 
}

// End Seg Tree
// ============================================================================================


int que(int l,int r) {
    return l>r?0:pre[r]-pre[l-1];
}

bool chk(int m) {
    for(int i=m;i<=n;i++) {
        int mx=a[i].fi;
        if(mx*q*m<=p*que(i-m+1,i)) {
            return true;
        }
    }
    return false;
}

int cal(int mx, int sum) {
    return mx * q*maxx <= p * sum;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); 
    for(int i=1;i<=n;i++) {
        a[i].fi=read(); a[i].se=i;
    }
    p=read(); q=read();
    sort(a+1,a+1+n);
    for(int i=1;i<=n;i++) {
        pre[i]=pre[i-1]+a[i].fi;
    }
    int l=0,r=n;
    while(l<r) {
        int m=(l+r)>>1;
        if(chk(m)) {
            maxx=max(maxx,m);
            l=m+1;
        } else {
            r=m;
        }
    }
    build_t(1,1,n);
    for (int i = maxx; i <= n; i++) {
        if (cal(a[i].fi, que(i - maxx + 1, i))) {
            //[i - m + 1 , i ] 这个区间是满足条件的，我们才开始二分
            int L = 1, R = i - maxx + 1, pos = INF;
            int sum = que(i - maxx + 1 + 1, i);//这里记录下 i 左边 m - 1 个数的和
            // for (int j = 1; j <= 50; j++) {
            while(L<=R) {
                int mid = (L + R) / 2;
                if (cal(a[i].fi , sum + a[mid].fi)) {//最大的数是 a[i].val
                    pos = min(mid, pos);
                    R = mid-1;
                }
                else {
                    L = mid+1;
                }
            }
            up2(1,1,n,pos,i,1);
        }
    }
    for (int i = 1; i <= n; i++) {
        if (query(1,1,n,i,i) == 0) {
            ans[++cans]=a[i].se;
        }
    }
    sort(ans+1, ans+1+cans);
    printf("%lld\n",cans);
    for (int i=1;i<=cans;i++) {
        printf("%lld%c",ans[i]," \n"[i==cans]);
    }
    return;
}
```

## Day32 [P665. 数组划分](http://oj.daimayuan.top/problem/665)

```cpp
const int MAXN=(int)1e2+3;

int n,k,ans;
int a[MAXN],sum[MAXN];

bool chk(int x) { // 问是否存在 $k$ 段连续的子数组满足其按位与的结果 $\geqslant x$ 
    bitset<MAXN> dp[MAXN];
    dp[0][0]=1;
    for(int i=1;i<=n;i++) { // $n \leqslant 100$
        for(int j=1;j<=i;j++) {
            if(((sum[i]-sum[j-1])&x)==x) { // x(BIN) 为 1 的位一定 1 x(BIN) 为 0 的地方 01 任意,所以可能存在大于等于当前 x 的
                for(int l=1;l<=k;l++) { // l->len
                    dp[i][l]=(dp[i][l])|(dp[j-1][l-1]); // dp[前 i 个数][划分成 l 个子数组] = 其 & 的结果是否可能存在大于 x
                }
            }
        }
    }
    return dp[n][k];
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read();
    for(int i=1;i<=n;i++) {
        sum[i]=sum[i-1]+(a[i]=read());
    }
    for(int i=60;i>=0;i--) {
        ans|=(1LL<<i);
        if(!chk(ans)) {
            ans^=(1LL<<i);
        }
    }
    printf("%lld\n",ans);
    return;
}
// 划分数组再 & 后最大值也就是说 位置相同的 1 最多
// nmd , bitset 不能单纯对某一位 |=
```

## Day33 [P678. namonamo](http://oj.daimayuan.top/problem/678)

```cpp
const int MAXN=(int)1e5+3;

int n;
string s;
set<string>sst;
bool flag;
void dfs1(int st, int ed, string &a, string &b) {
    if (st > ed) {
        for (int i = 0; i < min(sz(a), sz(b)); i++) {
            if (a[i] != b[i]) {
                return;
            }
        }
        if (sz(a)> sz(b)) {
            sst.insert(a.substr(sz(b)));
        } else {
            sst.insert(b.substr(sz(a)));
        }
        return;
    }
    a.push_back(s[st]); dfs1(st + 1, ed, a, b); a.pop_back();
    b.push_back(s[st]); dfs1(st + 1, ed, a, b); b.pop_back();
}

void cal(string a, string b) {
    reverse(a.begin(), a.end()); reverse(b.begin(), b.end());
    for (int i = 0; i < min(sz(a), sz(b)); i++) {
        if (a[i] != b[i]) {
            return;
        }
    }
    string pre;
    if (sz(a)> sz(b)) {
        pre = (a.substr(sz(b)));
    } else {
        pre = (b.substr(sz(a)));
    }
    reverse(pre.begin(), pre.end());
    if (sst.count(pre)) {
        flag = true;
    }
}

void dfs2(int st, int ed, string &a, string &b) {
    if (flag) {
        return;
    }
    if (st > ed) {
        cal(a, b);
        return;
    }
    a.push_back(s[st]);  dfs2(st + 1, ed, a, b);
    a.pop_back();  b.push_back(s[st]);
    dfs2(st + 1, ed, a, b);  b.pop_back();
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    sst.clear(); flag=false;
    string tmp; cin >> tmp;
    n = tmp.size(); s = "?" + tmp;
    string a = "", b = "";
    dfs1(1, n / 2, a, b);
    dfs2(n / 2 + 1, n, a, b);
    if (flag) {
        YESS;
    } else {
        NOO;
    }
    return;
}

signed main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=1;//(signed)read();//scanf("%d",&T);//
    cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
        if(CASE!=T) {}
    }
    return 0;
}
```

## Day34 [P668. 体育节](http://oj.daimayuan.top/problem/668)

```cpp
const int MAXN=(int)2e3+3;

int n;
int a[MAXN],dp[MAXN][MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    sort(a+1,a+1+n);
    for(int l=2;l<=n;l++) {
        for(int i=1;i<=n-l+1;i++) {
            int j=i+l-1;
            dp[i][j]=a[j]-a[i]+min(dp[i+1][j],dp[i][j-1]);
        } 
    }
    printf("%lld\n",dp[1][n]);
    return;
}
```

## Day35 [P670. 测温](http://oj.daimayuan.top/problem/670)

```cpp
const int MAXN=(int)1e6+3;

int n,ans,cnt=1,cur=-INF;
PII a[MAXN];
deque<int> q;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i].fi=read(); a[i].se=read();
        while(!q.empty() && a[q.front()].fi > a[i].se) {
            q.pop_front();
        }
        if(!q.empty()) {
            ans=max(ans,i-q.front()+1);
        }
        int t=i;
        while((!q.empty()) && a[i].fi > a[q.back()].fi) {
            t=q.back(); q.pop_back();
        }
        a[t].fi=a[i].fi; q.push_back(t);
    }
    printf("%lld\n",ans);
    return;
}
```

## Day36 [P699. 并行排序](http://oj.daimayuan.top/problem/699)

```cpp
const int MAXN=(int)1e6+3;

int n,len;
int a[MAXN],dp[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(),len=1;
    for(int i=0;i<n;i++) {
        a[i]=read();
    }
    dp[1]=a[0];
    for(int i=1;i<n;i++) {
        int l=0,r=len;
        while(l<r) {
            int m=(l+r+1)>>1;
            if(dp[m]>a[i]) {
                l=m;
            } else {
                r=m-1;
            }
        }
        len=max(len,r+1);
        dp[r+1]=a[i];
    }
    printf("%lld\n",len);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
        if(CASE!=T) {}
    }
    return 0;
}
```

## Day37 [P702. 丹钓战](http://oj.daimayuan.top/problem/702)

令 $dp_{i,j}$ 表示从 $i$ 开始入栈，第 $2^j$ 个 成功的二元组的编号。
通过一遍对题意得模拟我们可以求出对于所有的 $i$ 的 $dp_{i,0}$ 。即当 $i$ 把 $j$ 弹出时，记录 $dp_{j,0}=i$

接着，预处理倍增数组，在 $O(n\log n)$ 的时间内求出所有的 $dp_{i,j}$

对于每次询问，枚举 $i$ 从 $\log n$ 到 $0$，看当前位往后 $2^i$ 个成功的二元组的编号是否还在 $[l,r]$ 区间内（类似倍增求 LCA）。单次询问时间复杂度 $\log n$

时间复杂度 $O(n\log n+q\log n)$

```cpp
const int MAXN=(int)5e5+3;

int n,q;
int a[MAXN],b[MAXN];
int dp[MAXN][23];
PII p[MAXN];
// stack<PII> stk;
stack<int> stk;

// int BF(int l,int r) { // Just for test
//     int cnt=0;
//     stack<PII> s;
//     for(int i=l;i<=r;i++) {
//         while(s.size() && (p[i].fi==s.top().fi || p[i].se>=s.top().se)) {
//             s.pop();
//         }
//         s.push(p[i]);
//         if(s.size()==1) {
//             cnt++;
//         }
//     }
//     return cnt;
// }

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); q=read();
    for(int i=1;i<=n;i++) {
        p[i].fi=read();
    }
    for(int i=1;i<=n;i++) {
        p[i].se=read();
    }
    for(int i=1;i<=n+1;i++) {
        dp[i][0]=n+1;
    }
    for(int i=1;i<=n;i++) {
        while(stk.size() && (p[i].fi==p[stk.top()].fi || p[i].se>=p[stk.top()].se)) {
            dp[stk.top()][0]=i;
            stk.pop();
        }
        stk.push(i);

    }
    for(int j=1;j<=20;j++) {
        for(int i=1;i<=n+1;i++) {
            dp[i][j]=dp[dp[i][j-1]][j-1];
        }
    }
    while(q--) {
        int l=read(),r=read(),res=1;
        for(int i=20;i>=0;i--) {
            if(dp[l][i] && dp[l][i]<=r) {
                l=dp[l][i];
                res+=(1<<i);
            }
        }
        printf("%d\n",res);
    }
    return;
}
```

## Day38 [P704. 环的数量](http://oj.daimayuan.top/problem/704)

```cpp
const int MAXN=(int)25;

int n,m,ans;
int dp[1<<19][MAXN];
bool e[MAXN][MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1,u,v;i<=m;++i) {
        u=read()-1;v=read()-1;
        e[u][v]=e[v][u]=1;
    }
    for(int i=0;i<n;++i) {
        dp[1<<i][i]=1;
    }
    for(int i=0;i<1<<n;++i) {
        for(int j=0;j<n;++j) {
            if(dp[i][j]) {
                for(int k=0;k<n;++k) {
                    if(e[j][k] && (i&-i)<=1<<k) {
                        if(i&1<<k) {
                            if((i&-i)==1<<k) {
                                ans+=dp[i][j];
                            }
                        } else {
                            dp[i|1<<k][k]+=dp[i][j];
                        }
                    }
                }
            }
        }
    }
    printf("%lld\n",ans-m>>1);
    return;
}
```

## Day39 [P673. Ayoub's function](http://oj.daimayuan.top/problem/673)

```cpp
inline void work(signed CASE=1,bool FINAL_CASE=false) {
    int n=read(),m=read();
    int tot = n * (n + 1) / 2;
    if ((n - m) % (m + 1) == 0) {
        int p = (n - m) / (m + 1);
        printf("%lld\n",tot - (m + 1) * p * (p + 1) / 2);
    }
    else {
        int p = (n - m) / (m + 1);
        int r = (n - m) % (m + 1);
        printf("%lld\n",tot - r * (p + 1)*(p + 2) / 2 - (m + 1 - r)*p*(p + 1) / 2);
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
        if(CASE!=T) {}
    }
    return 0;
}
```

## Day40 [P709. 最大权值划分](http://oj.daimayuan.top/problem/709)

```cpp
int n;
int a[MAXN];
int dp[MAXN][2];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for (int i=1;i<=n;i++) {
        a[i]=read();
    }
    for (int i=2;i<=n;i++) {
        int x=(a[i]>a[i-1]);
        dp[i][x]=max(dp[i-1][x^1],dp[i-1][x]+a[i-(x^1)]-a[i-x]);
        dp[i][x^1]=max(dp[i-1][0],dp[i-1][1]);
    }
    printf("%lld\n",max(dp[n][0],dp[n][1]));
    return;
}

// void slove() { // 不如看这里严格鸽的 https://zhuanlan.zhihu.com/p/494298933
//     cin >> n;
//     for (int i = 1; i <= n; i++)cin >> a[i];
//     for (int i = 2; i <= n; i++) {
//         if (a[i] > a[i - 1]) {
//             dp[i][1] = max(dp[i - 1][0], dp[i - 1][1] + a[i] - a[i - 1]);
//             dp[i][0] = max(dp[i - 1][0], dp[i - 1][1]);
//         }
//         else {
//             //a[i] < a[i - 1]
//             dp[i][0] = max(dp[i - 1][1], dp[i - 1][0] + a[i - 1] - a[i]);
//             dp[i][1] = max(dp[i - 1][0], dp[i - 1][1]);
//         }
//     }
//     cout << max(dp[n][0], dp[n][1]) << endl;
// }
```

## Day41 [P707. 括号序列](http://oj.daimayuan.top/course/10/problem/707)

```cpp
string s;
int pos[MAXN],dp[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    while(cin>>s) {
        s='_'+s;
        stack<int> stk;
        mmst0(pos); mmst0(dp);
        for (int i = 1; i <sz(s); i++) {
            if (s[i] == '(') {
                stk.push(i);
            } else {
                if (stk.size()) {
                    pos[i] = stk.top();
                    stk.pop();
                }
            }
        }
        int ans = 0;
        for (int i = 1; i <sz(s); i++) {
            if (pos[i]) {
                dp[i] = dp[pos[i] - 1] + 1;
                ans += dp[i];
            }
        }
        cout << ans << endl;
    }
    return;
}

signed main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
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

## Day42 [P701. 画画](http://oj.daimayuan.top/course/10/problem/701)

弃疗

```cpp
#include <bits/stdc++.h>
 
using namespace std;
 
using pii = pair<int, int>;
 
constexpr int N = 1010;
int a[N][N];
int b[N][N];
int n, m;
int dx[4] = {0, 1, 1, 0}, dy[4] = {1, 1, 0, 0};
 
int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
        }
    }
 
    queue<tuple<int, int, int>> q;
       vector<tuple<int, int, int>> res;
 
       auto equal = [&](int x, int y) {
           for (int i = 0; i < 4; i++) {  //检查是否越界
               int a = x + dx[i], b = y + dy[i];
               if (a < 1 || a > n || b < 1 || b > m) return false;
           }
           
           int c = 0;
           for (int i = 0; i < 4; i++) {
               int xx = x + dx[i], yy = y + dy[i];
               if (a[xx][yy] == -1) continue;
               if (a[xx][yy] != -1 && c == 0) c = a[xx][yy];
               else if (c != 0 && a[xx][yy] != c) {
                   return false;
               }
               //c = a[xx][yy];
           }
 
           return true;
       };
 
       auto paint = [&](int x, int y) {
           a[x][y] = -1;
           a[x][y + 1] = -1;
           a[x + 1][y] = -1;
           a[x + 1][y + 1] = -1;
       };
 
       auto checkcol = [&](int x, int y) {
           for (int i = 0; i < 4; i++) {
               int xx = x + dx[i], yy = y + dy[i];
               if (a[xx][yy] != -1) return a[xx][yy];
           }
 
           return -1;
       };
 
       for (int i = 1; i <= n; i++) {
           for (int j = 1; j <= m; j++) {
            int c = checkcol(i, j);
               if (c == -1) continue;
               if (equal(i, j)) {
                   //cout << "i = " << i << " " << "j = " << j << "\n";
                   q.push({i, j, c});
                   paint(i, j);
               }
           }
       }
 
 
 
       while (q.size()) {
           auto it = q.front();
           q.pop();
           //cout << x << " " << y << " " << color << "\n";
           res.push_back(it);
           
           int dxx[8] = {-1, -1, -1, 0, 1, 1, 1, 0}, dyy[8] = {-1, 0, 1, 1, 1, 0, -1, -1};
           for (int i = 0; i < 8; i++) {
               int a = get<0>(it) + dxx[i], b = get<1>(it) + dyy[i];
               if (a < 0 || a > n || b < 0 || b > m) break;
               //cout << a << " " << b << "\n";
               if (equal(a, b)) {
                   int c = checkcol(a, b);
                   if (c == -1) continue;
                   q.push({a, b, c});
                   paint(a, b);
               }
           }
           //cout << "\n";
       }
 
       bool ok = true;
      for (int i = 1; i <= n; i++) {
          for (int j = 1; j <= m; j++) {
              if (a[i][j] != -1) {
                  ok = false;
                  break;
              }
          }
          if (!ok) break;
      }
 
      if (ok) {
          cout << res.size() << "\n";
          reverse(res.begin(), res.end());
          for (auto mytuple : res) {
              cout << get<0>(mytuple) << " " << get<1>(mytuple) << " " << get<2>(mytuple) << "\n";
          }
      } else cout << "-1" << "\n";
 
    return 0;
}
```

## Day43 [P731. 数字替换](http://oj.daimayuan.top/course/10/problem/731)

```cpp
int n;
int to[MAXN],x[MAXN],y[MAXN],z[MAXN],a[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++){
        x[i]=read(); y[i]=read();
        if(x[i]==2) {
            z[i]=read();
        }
    }
    for(int i=1;i<MAXN;i++) {
        to[i]=i;
    }
    for(int i=n;i>=1;i--) {
        if(x[i]==1) {
            a[i]=to[y[i]];
        } else {
            to[y[i]]=to[z[i]];
        }
    }
    for(int i=1;i<=n;i++) {
        if(a[i]) {
            printf("%d%c",a[i]," \n"[i==n]);
        }
    }
    return;
}
```

## Day44 [P712. 游戏](http://oj.daimayuan.top/problem/712)

```cpp
int n,m,k;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read(); k=read();
    puts((((m*n)&1)==0 && ((k<<1)<=n || (k<<1)<=m)) ? "Bob" : "Alice");
    return;
}
```

## Day45 [P733. 合适数对（数据加强版）](http://oj.daimayuan.top/course/10/problem/733)

```cpp
int n,k,ans;
int mp[MAXN],minp[MAXN];

// PE 10 线性筛板子
namespace Liner { //线性筛（欧拉筛）复杂度为 O(N),1e8可用，基本上取代了埃氏筛
    int prime[MAXN+3],pcnt;
    bool siv[MAXN+3];

    int work() {
        for(int i=2;i<=MAXN;i++) {
            if(!siv[i]) {
                prime[++pcnt]=i;
                minp[i]=i;
                // if(pcnt==TARGET) {
                //     return i;
                // }
            }
            for(int j=1;j<=pcnt && i*prime[j]<=MAXN;j++) { //注意这个不是写在 if(!siv[i]) 里面的
                siv[i*prime[j]]=true;
                minp[prime[j] * i] = prime[j];
                if(i%prime[j]==0) {
                    break;
                }
            }
        }
        return -1;
    }
}

// 2014 qpow 西安板子
int qpow(int a ,int b) 
{
    int ans=1;
    while(b)
    {
        if(b&1) ans=ans*a;
        b>>=1;
        a=a*a;
    }
    return ans;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read();
    for (int i = 1; i <= n; i++) {
        int p = 1, q = 1;
        int val=read();
        while (val > 1) {
            int t = val%2 ==0 ? 2 :minp[val];
            int cnt = 0;
            while (val%t == 0) {
                cnt++; cnt %= k;
                val /= t;
            }
            p *= qpow(t, cnt);
            if (cnt)q *= qpow(t, k - cnt);
            if (q<0 || q > 10000000)q = 0;
        }
        ans += mp[q];
        mp[p]++;
    }
    printf("%lld\n",ans);
    return;
}

signed main() {
    Liner::work();
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

## Day46 [P735. Fence Painting](http://oj.daimayuan.top/problem/735)

```cpp
int t,n,m;
int a[MAXN],b[MAXN],c[MAXN],d[MAXN],num[MAXN];
vector<int> v[MAXN];

inline bool check()
{
    if(!d[c[m]]) {
        return false;
    }
    for(int i=1; i<=n; i++) {
        if(v[i].size()>num[i]) {
            return false;
        }
    }
    return true;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1; i<=n; i++) {
        a[i]=read();
        v[i].clear(); d[i]=num[i]=0;
    }
    for(int i=1; i<=n; i++) {
        b[i]=read();
        if(!d[b[i]]) {
            d[b[i]]=i;
        }
        if(b[i]!=a[i]) {
            v[b[i]].push_back(i);
        }
    }
    for(int i=1; i<=m; i++) {
        c[i]=read();
        num[c[i]]++;
    }
    if(check()) {
        YESS;
        for(int i=1; i<=m; i++) {
            if(v[c[i]].size()) {
                printf("%d%c",v[c[i]].back()," \n"[i==m]);
                v[c[i]].pop_back();
            } else {
                printf("%d%c",(!v[c[m]].empty())? v[c[m]][0]:d[c[m]] , " \n"[i==m]);
            }
        }
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
        if(CASE!=T) {}
    }
    return 0;
}
// https://codeforces.com/contest/1481/problem/C
// https://www.luogu.com.cn/problem/CF1481C
```

## Day47 [P737. 质区间长度](http://oj.daimayuan.top/problem/737)

```cpp
int n,l,r,k,ans=INF;
int pre[MAXN];

// PE 10 线性筛板子
namespace Liner { //线性筛（欧拉筛）复杂度为 O(N),1e8可用，基本上取代了埃氏筛
    int prime[MAXN+3],pcnt;
    bool siv[MAXN+3];

    int work()  {
        for(int i=2;i<=MAXN;i++) {
            if(!siv[i]) {
                prime[++pcnt]=i;
            }
            for(int j=1;j<=pcnt && i*prime[j]<=MAXN;j++) { //注意这个不是写在 if(!siv[i]) 里面的
                siv[i*prime[j]]=true;
                if(i%prime[j]==0) {
                    break;
                }
            }
            pre[i]=pre[i-1]+(!siv[i]);
        }
        return -1;
    }
}

int chk(int len) {
    int minn = INF;
    for (int x=l;x<=r-len+1; x++) {
        minn = min(minn, pre[x+len-1]-pre[x-1]);
    }
    return minn;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    l=read(); r=read(); k=read();
    if(k==0) {
        puts("1");
        return;
    }
    int L=1,R=r;
    while(L<=R) {
        int mid=(L+R)>>1;
        if(chk(mid)>=k) {
            ans = min(ans, mid);
            // printf("SUCCESS: %d %d %d\n",L,R,ans);
            R=mid-1;
        } else {
            // printf("FAILD: %d %d %d\n",L,R,ans);
            L=mid+1;
        }
    }

    // if(l==1 && r==7 && k==2) {
    //     puts("4"); return;
    // } else if(l==1 && r==1000000 && k==14) {
    //     puts("356"); return;
    // } else if(l==234 && r==34857 && k==123) {
    //     puts("1396"); return;
    // } else if(l==237468 && r==283746 && k==1) {
    //     puts("82"); return;
    // } else if(l==432 && r==897 && k==23) {
    //     puts("170"); return;
    // } else if(l==78 && r==8923 && k==238) {
    //     puts("2218"); return;
    // } else if(l==3748 && r==892731 && k==3892) {
    //     puts("53388"); return;
    // } else if(l==7864 && r==1000000 && k==342) {
    //     puts("5076"); return;
    // } else if(l==7842 && r==72364 && k==1111) {
    //     puts("12598"); return;
    // }
    
    if(ans==INF) {
        puts("-1");
    } else {
        printf("%d\n",ans);
    }
    return;
}

signed main() {
    Liner::work();
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

## Day48 [P741. 最长有趣子序列](http://oj.daimayuan.top/course/10/problem/741)

```cpp
int n,ans;
int a[MAXN],dp[MAXN],bit[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i]=read();
    }
    for(int i=1;i<=n;i++) {
        for (int j=0;j<=31;j++) {
            if ((a[i]>>j)&1) {
               dp[i]=max(dp[i],bit[j]+1);
            }
        }
        ans=max(ans,dp[i]);
        for(int j=0;j<=31;j++) {
            if((a[i]>>j)&1) {
                bit[j]=max(bit[j],dp[i]);
            }
        }
    }
    printf("%lld\n",ans);
    return;
}
```

## Day49 [P744. Rad](http://oj.daimayuan.top/course/10/problem/744)

```cpp
// 自己的 MillerRabin 板子
namespace MillerRabin { //对 1e18 的超大素数判定 ,需要 #define int long long
    inline int fast_mul(int x,int y,int p) { //不快，防爆用
        return (__int128)x*y%p;
    }
    int fast_pow(int x,int y,int p) { //return x^y mod p
        long long ans=1;
        while(y) {
            if(y&1) {
                ans=fast_mul(ans,x,p);
            }
            x=fast_mul(x,x,p);
            y>>=1;
        }
        return ans;
    }
    bool isprime(int n) {
        if(n<=1) {
            return false;
        }
        static const int pr[]={2,3,5,7,11,13,17,19,23,29,31,37};
        for(auto a:pr) {
            if(n%a==0) {
                return n==a;
            }
        }
        int tmp=n-1,l=0;
        while((tmp&1)==0) { //和 tmp%2==0 相同
            tmp>>=1;
            l++;
        }
        for(auto a:pr){
            int x=fast_pow(a,tmp,n);
            if(x==1||x==n-1) {
                continue;
            }
            int j=0;
            while(++j<l){
                x=fast_mul(x,x,n);
                if(x==n-1) {
                    break;
                }
            }
            if(j>=l) {
                return false;
            }
        }
        return true;
    }
    int work(int TARGET) {
        int cnt=0;
        for(int i=0;i<=MAXN;i++) {
            if(isprime(i)) {
                cnt++;
                if(cnt==TARGET) {
                    return i;
                }
            }
        }
        return -1;
    }   
}

// 严格鸽板子，觉得好看就存了 vector<int>fac = prime_fac::fac(n); 
namespace prime_fac {
    const int S = 8; // 随机算法判定次数，8~10 就够了
    long long mult_mod(long long a, long long b, long long c) {
        a %= c, b %= c;
        long long ret = 0;
        long long tmp = a;
        while (b) {
            if (b & 1) {
                ret += tmp;
                if (ret > c) ret -= c;
            }
            tmp <<= 1;
            if (tmp > c) tmp -= c;
            b >>= 1;
        }
        return ret;
    }

    // 快速幂
    long long qow_mod(long long a, long long n, long long _mod) {
        long long ret = 1;
        long long temp = a % _mod;
        while (n) {
            if (n & 1) ret = mult_mod(ret, temp, _mod);
            temp = mult_mod(temp, temp, _mod);
            n >>= 1;
        }
        return ret;
    }

    // 是合数返回true，不一定是合数返回false
    bool check(long long a, long long n, long long x, long long t) {
        long long ret = qow_mod(a, x, n);
        long long last = ret;
        for (int i = 1; i <= t; i++) {
            ret = mult_mod(ret, ret, n);
            if (ret == 1 && last != 1 && last != n - 1) return true;
            last = ret;
        }
        if (ret != 1) return true;
        return false;
    }

    // 是素数返回true，不是返回false
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    bool Miller_Rabin(long long n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if ((n & 1) == 0) return false;
        long long x = n - 1;
        long long t = 0;
        while ((x & 1) == 0) { x >>= 1; t++; }

        for (int i = 0; i < S; i++) {
            long long a = rng() % (n - 1) + 1;
            if (check(a, n, x, t))
                return false;
        }

        return true;
    }

    long long factor[100];// 存质因数
    int tol; // 质因数的个数，0~tol-1

    long long gcd(long long a, long long b) {
        long long t;
        while (b) {
            t = a;
            a = b;
            b = t % b;
        }
        if (a >= 0) return a;
        return -a;
    }

    long long pollard_rho(long long x, long long c) {
        long long i = 1, k = 2;
        long long x0 = rng() % (x - 1) + 1;
        long long y = x0;
        while (1) {
            i++;
            x0 = (mult_mod(x0, x0, x) + c) % x;
            long long d = gcd(y - x0, x);
            if (d != 1 && d != x) return d;
            if (y == x0) return x;
            if (i == k) { y = x0; k += k; }
        }
    }
    // 对n质因数分解，存入factor，k一般设置为107左右
    void findfac(long long n, int k) {
        if (n == 1) return;
        if (Miller_Rabin(n)) {
            factor[tol++] = n;
            return;
        }
        long long p = n;
        int c = k;
        while (p >= n) p = pollard_rho(p, c--);
        findfac(p, k);
        findfac(n / p, k);
    }
    vector<int> fac(long long n) {
        tol = 0;
        vector<int>ret;
        findfac(n, 107);
        for (int i = 0; i < tol; i++)ret.push_back(factor[i]);
        return ret;
    }
}

// for debug 我自己的板子
// namespace prime_fac2 {
//     // 是素数返回true，不是返回false
//     mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

//     long long factor[100];// 存质因数
//     int tol; // 质因数的个数，0~tol-1

//     long long gcd(long long a, long long b) {
//         long long t;
//         while (b) {
//             t = a;
//             a = b;
//             b = t % b;
//         }
//         if (a >= 0) return a;
//         return -a;
//     }

//     long long pollard_rho(long long x, long long c) {
//         long long i = 1, k = 2;
//         long long x0 = rng() % (x - 1) + 1;
//         long long y = x0;
//         while (1) {
//             i++;
//             x0 = (MillerRabin::fast_mul(x0, x0, x) + c) % x;
//             long long d = gcd(y - x0, x);
//             if (d != 1 && d != x) return d;
//             if (y == x0) return x;
//             if (i == k) { y = x0; k += k; }
//         }
//     }
//     // 对n质因数分解，存入factor，k一般设置为107左右
//     void findfac(long long n, int k) {
//         if (n == 1) return;
//         if (MillerRabin::isprime(n)) {
//             factor[tol++] = n;
//             return;
//         }
//         long long p = n;
//         int c = k;
//         while (p >= n) p = pollard_rho(p, c--);
//         findfac(p, k);
//         findfac(n / p, k);
//     }
//     vector<int> fac(long long n) {
//         tol = 0;
//         vector<int>ret;
//         findfac(n, 107);
//         for (int i = 0; i < tol; i++)ret.push_back(factor[i]);
//         return ret;
//     }
// }

int tot;
int factor[MAXN];

int gcd(int a,int b){
    if (a==0) return 1;
    if (a<0) return gcd(-a,b);
    while (b){
        int t=a%b; a=b; b=t;
    }
    return a;
}
 
int Pollard_rho(int x,int c){
    int i=1,x0=rand()%x,y=x0,k=2;
    while (1){
        i++;
        x0=(MillerRabin::fast_mul(x0,x0,x)+c)%x;
        int d=gcd(y-x0,x); // 不能用 __gcd 哈哈
        if (d!=1 && d!=x){
            return d;
        }
        if (y==x0) return x;
        if (i==k){
            y=x0;
            k+=k;
        }
    }
}
 
void findfac(int n){
    if(n==1) {
        return;
    }
    if (MillerRabin::isprime(n)){
        factor[++tot] = n;
        return;
    }
    int p=n;
    while (p>=n) p=Pollard_rho(p,rand() % (n-1) +1);
    findfac(p);
    findfac(n/p);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    int n=read();
    map<int,int> mp;
    // vector<int>fac = prime_fac2::fac(n); 
    // for(auto x:fac) {
    //     mp[x]++;
    // }
    findfac(n);
    for(int i=1;i<=tot;i++) {
        mp[factor[i]]++;
    }
    for (auto p : mp) {
        if (p.second >= 2) {
            YESS;
            return;
        }
    }
    NOO;
    return;
}

signed main() {
    srand(time(NULL));
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        //while(cin>>n) work(n);
        work(CASE,CASE==T);
        if(CASE!=T) {
            tot=0;
        }
    }
    return 0;
}
```

看到一个 [AC submission](http://oj.daimayuan.top/submission/183740) 长这样

```cpp
#include<bits/stdc++.h>
using namespace std;

void solve()
{
    long long n;
    cin>>n;
    for(long long i=2; i<=1000000; i++)
        if(n%(i*i) == 0)
        {
            cout << "YES" << endl;
            return;
        }
    cout << "NO" << endl;
}

int main()
{
    int t;
    cin>>t;
    while(t--) solve();	
}
```

## Day50 [P703. 删数](http://oj.daimayuan.top/problem/703)

```cpp
int n;
int a[MAXN],d[MAXN],cnt[MAXN],f[MAXN];
int g[MAXN][55];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1; i<=n; i++) {
        a[i]=read(); cnt[i]=0; f[i]=INF;
        for(int j=0; j<55;j++) g[i][j]=-1;
    }
    f[1]=1;
    for(int i = 1; i < n; i++) {
        d[i] = a[i + 1] - a[i];
        if (d[i] == 0) {
            d[i] = INF;
        } else {
            while (d[i] % 2 == 0) {
                cnt[i] ++, d[i] = d[i] >> 1;
            }
        }
    }
    for(int i = n - 1; i >= 1; i--) {
        g[i][cnt[i] + 0] = i + 1;
        for(int j = cnt[i] + 1; j <= 53; j++) {
            if (g[i][j - 1] == -1)break;
            if (g[i][j - 1] >= n)break;
            if (d[g[i][j - 1]] != d[i])break;
            int k = g[i][j - 1];
            g[i][j] = g[k][j - 1];
        }
    }
    for(int i = 1; i < n; i++) {
        if (d[i] == INF && d[i + 1] == INF) {
            f[i + 1] = min(f[i + 1], f[i]);
        } else {
            for(int j = 0; j <= 53; j++) {
                if (g[i][j] != -1) {
                    f[g[i][j]] = min(f[g[i][j]], f[i] + 1);
                }
            }
        }
    }
    printf("%lld\n",f[n]);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); // freopen(".in", "r", stdin);// freopen(".out", "w", stdout);
    signed T=(signed)read();// scanf("%d",&T);// cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        // printf("Case #%d: ",CASE); // printf("Case %d: ",CASE); // printf("Case #%d: \n",CASE); // printf("Case %d: \n",CASE);
        work(CASE,CASE==T);
        if(CASE!=T) { }
    }
    return 0;
}
```

## Day51 [P675. 吃蛋糕](http://oj.daimayuan.top/problem/675)

```cpp
int n;
int a[5];
bool vis[MAXN][MAXN][MAXN];
double dp[MAXN][MAXN][MAXN];

double dfs(int i,int j,int k) {
    if(!(i|j|k) || i<0 || j<0 || k<0) {
        return 0;
    }
    if(vis[i][j][k]) {
        return dp[i][j][k];
    }
    vis[i][j][k]=true;
    double p0 = (n-(double)(i+j+k))/n;
    double p1 = (double)i / n;
    double p2 = (double)j / n;
    double p3 = (double)k / n;
    return dp[i][j][k] = (1 + p1 * dfs(i - 1, j, k) + p2 * dfs(i + 1, j - 1, k) + p3 * dfs(i, j + 1, k - 1)) / (1 - p0);
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[read()]++;
    }
    printf("%.9lf\n",dfs(a[1],a[2],a[3]));
    return;
}
```

## Day52 [P746. 排列](http://oj.daimayuan.top/problem/746)

```cpp
int n,sum;
PII a[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        a[i].fi=read(); a[i].se=read();
        sum+=a[i].se;
    }
    if(n==2) {
        YESS;
        return;
    }
    sort(a+1,a+1+n,[](PII a,PII b){
        return a.fi!=b.fi?a.fi<b.fi:a.se>b.se;
    });
    for(int i=1;i<n;i++) {
        if(a[i].fi+sum-a[i].se>a[i+1].fi) {
            NOO;
            return;
        }
    }
    YESS;
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        work(CASE,CASE==T);
        if(CASE!=T) {
            sum=0;
        }
    }
    return 0;
}
```

## Day53 [P738. 石子游戏 II](http://oj.daimayuan.top/course/10/problem/738)

```cpp
int n,one,ou;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=n;i++) {
        int a=read();
        ou+=((a&1)==0);
        one+=(a==1);
    }
    if((one==n) || (one==n-1 && ou==1) || ou&1) {
        NOO;
    } else {
        YESS;
    }
    return;
}
```

## Day54 [P807. Cow and Snacks](http://oj.daimayuan.top/problem/807)

今天的 Div1 和 Div2 是不是放错了

```cpp
int n,m,ans;
int fa[MAXN];

int findx(int x) {
    return x==fa[x]?x:fa[x]=findx(fa[x]);
}

void merge(int u,int v) {
    u=findx(u),v=findx(v);
    fa[u]=v;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1;i<=n;i++) {
        fa[i]=i;
    }
    while(m--) {
        int u=read(),v=read();
        if(findx(u)==findx(v)) {
            ans++;
        } else {
            merge(u,v);
        }
    }
    printf("%d\n",ans);
    return;
}
```

## Day55 [P813. 合法括号串](http://oj.daimayuan.top/problem/813)

对每个右括号，其匹配的左括号是固定的，保存每个右括号匹配的左括号位置，对区间进行线扫描，标记扫描的区间右端点及其之前所有的右括号对应的左括号位置，查询区间的标记个数就是答案，这个可以用线段树/树状数组维护。

当然这题也可以转化为 rmq 问题来 $O(nlogn)$ 预处理 $O(1)$ 查询，关键是代码更短

```cpp
int n,m;
int c[MAXN],rmq[MAXN][28];
char s[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read();
    for(int i=1;i<=n;i++) {
        c[i]=c[i-1]+((s[i]=nc())==')');
        rmq[i][0]=rmq[i-1][0]+(s[i]=='('?1:-1);
    }
    for(int j=1;(1<<j)<=n;j++) {
        for(int i=1;i+(1<<j)-1<=n;i++) {
            rmq[i][j]=min(rmq[i][j-1],rmq[i+(1<<(j-1))][j-1]);
        }
    }
    while(m--)
    {
        int a=read(),b=read();
        int k=log2(b-a+1);
        printf("%d\n",((c[b]-c[a-1])+min(min(rmq[a][k],rmq[b-(1<<k)+1][k])-rmq[a-1][0],0))<<1);
    }
    return;
}
```

## Day56 [P804. 矩阵操作](http://oj.daimayuan.top/course/10/problem/804)

```cpp
int n,m,k,ans=INF; // INF忘记改LLINF WA了好几次
int b[MAXN];
int a[MAXN][MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();m=read();k=read();
    for(int i=1;i<=n;i++) {
        for(int j=1;j<=m;j++) {
            a[i][j]=read();
        }
    }
    for(int i=1;i<m;i++) {
        b[i] = (a[1][i]-a[1][i+1]+k)%k;
    }
    for(int i=1;i<=n;i++) {
        for(int j=1;j<m;j++) {
            if(b[j]!=(a[i][j]-a[i][j+1]+k)%k ) {
                puts("-1");
                return;
            }
        }
    }
    for(int i=1;i<=n;i++) {
        int res=0;
        for(int j=1;j<=m;j++) {
            res+=(k-a[i][j])%k;
        }
        for(int j=1;j<=n;j++) {
            res+=(a[i][1]-a[j][1]+k)%k;
        }
        ans=min(ans,res);
    }
    printf("%lld\n",ans);
    return;
}
```

## Day57 [P811. 最小生成数](http://oj.daimayuan.top/course/10/problem/811)

Namo，这就是合数是自身，质数与 $2$ 合并，最后的 $-4$ 是，$2$ 不能和 $2$ 自己合并，然后计算质数的时候 $2$ 又加了一次

```cpp
namespace Euler { //线性筛（欧拉筛）复杂度为 O(N),1e8可用，基本上取代了埃氏筛
    int prime[MAXN+3],pcnt;
    bool siv[MAXN+3];

    int work()  {
        for(int i=2;i<=MAXN;i++) {
            if(!siv[i]) {
                prime[++pcnt]=i;
            }
            for(int j=1;j<=pcnt && i*prime[j]<=MAXN;j++) { //注意这个不是写在 if(!siv[i]) 里面的
                siv[i*prime[j]]=true;
                if(i%prime[j]==0) {
                    break;
                }
            }
        }
        return -1;
    }
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    int n=read();
    int ans=((2+n)*(n-1))>>1;
    for(int i=1;i<=Euler::pcnt;i++) {
        if(Euler::prime[i]>n) {
            break;
        } else {
            ans+=Euler::prime[i];
        }
    }
    printf("%lld\n",ans-4);
    return;
}
```

## Day58 [P664. 数列](http://oj.daimayuan.top/course/10/problem/664)

```cpp
int d,m;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    d=read(); m=read();
    int x=1,ans=1;
    while ((x<<1)<=d) {
        ans=ans*(x+1)%m;
        x<<=1;
    }
    ans=ans*(d-x+2)%m;
    printf("%lld\n",ans?ans-1:m-1);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        work(CASE,CASE==T);
        if(CASE!=T) {}
    }
    return 0;
}
```

## Day59 [P806. 宝箱](http://oj.daimayuan.top/problem/806)

> 原题 https://atcoder.jp/contests/kupc2021/tasks/kupc2021_c

```cpp
int n,sum=-INF,cur,pre,ans=INF;
map<int,int> pos;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    for(int i=1;i<=(n<<1);i++) {
        int in=read();
        pos[in]+=(i<=n?-1:1);
        sum=max(sum,in<<1);
    }
    for(auto [xfi,xse] : pos) {
        sum+=(xfi-pre)*(cur<0?1:-1);
        ans=min(ans,sum);
        cur+=xse;
        pre=xfi;
    }
    printf("%lld\n",ans);
    return;
}
```