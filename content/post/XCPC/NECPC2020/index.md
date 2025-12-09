---
title: "2020第14届CCPC东北四省赛"
date: 2022-04-23T16:45:16+08:00
math: true
# weight: 1
# aliases: ["/first"]
tags: ["算法竞赛"]
categories: ["XCPC"]
# author: ["Me", "You"] # multiple authors
# showToc: true
# TocOpen: false
# draft: false
# hidemeta: false
# comments: false
description: "虽然但是，我已经是第四次写这套东北CCPC考研英语了"
slug: "NECPC2020"
image: pic.jpg
---

https://codeforces.com/gym/102801

虽然但是，我已经是第四次写这套东北CCPC考研英语了，第一次是打星参赛，第二次是补题，第三次是15th四省赛前，第四次是现在，2022年

~~即使写第四次了还是难免感叹[凯爷](https://kaizynx.github.io/)的 **PepperLa** 系列题出的真的是蛋疼，属于东北CCPC考研英语了~~


## [C.Function](https://codeforces.com/gym/102801/problem/C)

```cpp
int n,m,ans;

int f(int x) {
    if(x%10==0) {
        return 0;
    }
    int res=1,a=10;
    while(a/10<x) {
        res=res*(x%a)%(x+1);
        a*=10;
    }
    return res;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); m=read(); 
    for(int i=1;i<=m;i++){
        int t=f(n);
        if(t==n) {
            ans+=(m-i+1)*t;
            break;
        }
        ans+=(n=t);
    }
    printf("%lld\n",ans);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        work(CASE,CASE==T);
        if(CASE!=T) {
            ans=0;
        }
    }
    return 0;
}
```

## [D.Fall Guys](https://codeforces.com/gym/102801/problem/D)

```cpp
int n,h,H;
int x[MAXN],c[MAXN],wt[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); h=read(); H=read();
    for(int i=0;i<2*H;i++) {
        wt[i]=(i>h && 2*H-h-i>0)?wt[i]=2*H-h-i:0;
    }
    for(int i=1;i<=n;i++) {
        x[i]=read();
    }
    for(int i=1;i<=n;i++) {
        c[i]=read();
    }
    int minn=INF,ans=-1;
    for(int i=1;i<=n;i++){
        if(minn>(x[i]+c[i]+wt[(x[i]%(H<<1))])) {
            minn=(x[i]+c[i]+wt[(x[i]%(H<<1))]),ans=i;
        }
    }
    printf("%d\n",ans);
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

## [E.Liner vectors](https://codeforces.com/gym/102801/problem/E)

```cpp
int n,k;

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read();
    if(n==1) {
        puts("1");
        return;
    }
    if(n==k || !(k&1)) {
        puts("-1");
        return;
    }
    for(int i=0;i<=k;i++) {
        printf("%lld ",((int)1<<k+1)-1^((int)1<<k-i));
    }
    for(int i=k+1;i<n;i++) {
        printf("%lld%c",((int)1<<i)|((int)1<<k-1)-1," \n"[i==(n-1)]);
    }
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

## [G.Halli Galli](https://codeforces.com/gym/102801/problem/G)

```cpp
int n,k,ans;
int a[MAXN];
char s[MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read(); k=read(); 
    map<char,int>mp;
    for(int i=1;i<=n;i++) {
        mp[s[i%k]]-=a[i%k];
        s[i%k]=nc(); a[i%k]=read();
        mp[s[i%k]]+=a[i%k];
        for(auto x:mp) {
            ans+=(x.se==5);
        }
    }
    printf("%d\n",ans);
    return;
}

signed main() {
    // ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr); //freopen(".in", "r", stdin);//freopen(".out", "w", stdout);
    signed T=(signed)read();//scanf("%d",&T);//cin>>T;
    for(signed CASE=1; CASE<=T; CASE++) { //
        //printf("Case #%d: ",CASE); //printf("Case %d: ",CASE); //printf("Case #%d: \n",CASE); //printf("Case %d: \n",CASE);
        work(CASE,CASE==T);
        if(CASE!=T) {
            ans=0;
            mmst0(a);
        }
    }
    return 0;
}
```

## [H.PepperLa's String](https://codeforces.com/gym/102801/problem/H)

```cpp
int num[MAXN];
char s[MAXN],c[MAXN];

bool chk(int x) {
    while(x>1) {
        if(x%16) {
            return false;
        }
        x/=16;
    }
    return true;
}

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    while(~scanf("%s",s+1)) {
        int now=1,cnt=0,pos=0;
        int len=strlen(s+1); s[len+1]=0x7f;
        for(int i=2;i<=len+1;i++) {
            if(s[i]!=s[i-1]) {
                c[cnt]=s[i-1];
                num[cnt++]=now;
                now=1;
            } else {
                now++;
            }
        }
        c[cnt]=0x7f;
        for(int i=0;i<cnt;i++) {
            if(num[i]==1) {
                pos=i;
                if(c[i]>c[i+1]) {
                    break;
                }
            }
            if(num[i]==2 || chk(num[i])) {
                pos=i;
            }
        }
        num[pos]--;
        for(int i=0;i<cnt;i++) {
            if(num[i]) {
                printf("%c",c[i]);
                if(num[i]!=1)
                    printf("%X",num[i]);
                }
        }
        puts("");
    }
    return;
}
```

## [I.PepperLa's Cram School](https://codeforces.com/gym/102801/problem/I)

```cpp
int n,ans,minn=INF;
int a[MAXN][MAXN];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    // while(n=read()) { 怎么有人出题不写 T 的啊
    while(cin>>n) {
        minn=INF,ans=0;
        for(int i=1;i<=n;i++) {
            for(int j=1;j<=n;j++) {
                // a[i][j]=read();
                cin>>a[i][j];
                minn=(i!=j && a[i][j]<minn)?a[i][j]:minn;
            }
        }
        for(int i=1;i<=n;i++) {
            for(int j=1;j<=n;j++) {
                ans+=(a[i][j]==minn);
            }
        }
        printf("%d\n",ans>>1);
    }
    return;
}
```

## [J.Color the blocks](https://codeforces.com/gym/102801/problem/J)

```cpp
int n,a[20];

inline void work(signed CASE=1,bool FINAL_CASE=false) {
    n=read();
    if(n==1) {
        puts("2");
    } else if(n==2) {
        puts("16");
    } else if(n==3) {
       puts("32");
    } else {
        puts("4");
    }
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
