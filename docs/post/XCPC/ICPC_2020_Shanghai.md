---
title: "ICPC 2020 Shangahi"
date: "2020-12-13T20:57:45+08:00"
tags: ["算法竞赛"]
categories: ["XCPC"]
slug: "ICPC_2020_Shanghai"
---

嘛，没想到我的ICPC之旅的第一站就那么卷,开局南师大6S AC最速传说，然后被dq了，开场签到很稳，和文哥直接推出了公式，和黄总写的暴力程序直接对拍正确A掉签到题

然后在开B和M之间纠结，队伍里就我用过git，就看懂了M的题意，然后和黄总一起构树两次DFS写M，文哥没用过git就没看懂git的忽略操作的意思，文哥去开了B，然后M构树挂了三四次浪费了4H，然后文哥来看了M，这次告诉文哥，git的忽略在这题就理解成删除，文哥上手M题，直接30MIN给过了，文哥·工大唯一真神。到这里已经来不及做B了，实际上文哥B的思路是正确的。

感觉这场我有点演==挂件模式全开，我的构树是竞赛少用的指针+vector构树，然后和黄总的构树代码完全不兼容，后来想到了Trie，但是用的模板好像是假的==

## B

```cpp
#include<bits/stdc++.h>

using namespace std;

const int maxn = 1e3+3;
int cnt,n,m;
char a[maxn][maxn] ,b[maxn][maxn];
int main()
{
	cin >> n >> m;
	for(int i=0;i<n;i++)scanf("%s",a+i);
	for(int i=0;i<n;i++)scanf("%s",b+i);
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
			if(a[i][j]!=b[i][j]) cnt++;
	if(cnt>n*m/2)
    {
		for(int i=0;i<n;i++)
			for(int j=0;j<m;j++)
				if(a[i][j]=='.') a[i][j]='X';
				else a[i][j]='.';
	}
	for(int i=0;i<n;i++) printf("%s\n",a+i);
	return 0;
}
```

## D

```cpp
#include<bits/stdc++.h>

using namespace std;

double n,p1,v1,p2,v2,l,r,mid;

double calc(double n,double p,double v)
{
    return min(n-p+n,p+n)/v;
}

void work()
{
    scanf("%lf%lf%lf%lf%lf",&n,&p1,&v1,&p2,&v2);
    double ans=min(calc(n,p1,v1),calc(n,p2,v2));
    if (p1>p2) swap(p1,p2),swap(v1,v2);
    ans=min(ans,max(p2/v2,(n-p1)/v1));
    l=p1,r=p2;
    for (int i=1; i<=100; i++)
    {
        mid=(l+r)/2.0;
        double ans1=calc(mid,p1,v1),ans2=calc(n-mid,p2-mid,v2);
        ans=min(ans,max(ans1,ans2));
        if (ans1>ans2) r=mid;
        else l=mid;
    }
    printf("%.10lf\n",ans);
}

int main()
{
    int T;
    scanf("%d",&T);
    while (T--)work();
}
```

## G

```cpp
#include<bits/stdc++.h>

using namespace std;

#define int long long

const int N = 2e5+100;

signed main()
{
	int n;
	scanf("%lld",&n);
	int ans=(n-(n/3))*(n/3)+(n/3)*(n/3-1)/2;
	cout<<ans<<endl;
	return 0;
}
```

## I

```cpp
#include<bits/stdc++.h>
#define MN 500

using namespace std;

typedef long double ld;
const ld pai = acos(-1);

int n,m;

ld len,ans;
ld f[MN+5];

int main()
{
	scanf("%d%d",&n,&m);
	ld d = pai/m; 
	for(int i=1;i<m;i++)
    {
		if(i*d>2)len+=2;
		else len+=i*d;
	}
	len*=2;
	len+=2;
	for(int i=1;i<=n;i++)
    {
		f[i]=len*i+2*m*(i-1)+1+f[i-1];
		ans += m*(f[i]*2-i*len);
	}
    if(m==1) ans-=(2+2*n)*n/2;
	printf("%.10lf\n",(double)ans);
}
```

## M

```cpp
#include<bits/stdc++.h>
using namespace std; 
int n,m;
int vis[10100];
int qian[10100];
int z[10100];
int shu[10100];
int vi[10100];
int o[10100];
void init(){
	memset(vis,0,sizeof(vis));
	memset(qian,0,sizeof(qian));
	memset(z,0,sizeof(z));
	memset(shu,0,sizeof(shu));
//	memset(vis,0,sizeof(vis));
	memset(vi,0,sizeof(vi));
	memset(o,0,sizeof(o));
}
struct node{
	int i;
	int x;
};
int main()
{
	int T ;
	cin>>T;
	while(T--){
		cin>>n>>m;
		init();
		map<string ,int > mp;
		int tot=1;
		for(int i=1;i<=n;i++){
			string str;
			cin>>str;
			str=str+"/";
			string s;
			int flag=0;
			string p;
			for(int j=0;j<str.size();j++){
				if(str[j]=='/'&&flag==0){
					flag=1;
					p=s;
					if(mp[s]==0){
						mp[s]=++tot;
						qian[tot]=1;
						z[tot]=1;
					}
				}
				else if(str[j]=='/'&&flag==1){
					if(mp[s]==0){
						mp[s]=++tot;
						qian[tot]=mp[p];
						z[tot]=1;
						shu[mp[p]]++;
					}
					p=s;
				}
				s+=str[j];
			}	
		}
		for(int i=1;i<=m;i++){
			string str;
			cin>>str;
			str=str+"/";
			string s;
			int flag=0;
			string p;
			for(int j=0;j<str.size();j++){
				if(str[j]=='/'&&flag==0){
					flag=1;
					p=s;
					if(mp[s]==0){
						mp[s]=++tot;
						qian[tot]=1;
						z[tot]=0;
					}
				}
				else if(str[j]=='/'&&flag==1){
					if(mp[s]==0){
						mp[s]=++tot;
						qian[tot]=mp[p];
						z[tot]=0;
						shu[mp[p]]++;
					}
					p=s;
				}
				s+=str[j];
			}	
		}
//		for(int i=1;i<=tot;i++){
//			cout<<i<<" ";
//		}
//		cout<<endl;
//		for(int i=1;i<=tot;i++){
//			cout<<qian[i]<<" ";
//		}
//		cout<<endl;
//		for(int i=1;i<=tot;i++){
//			cout<<shu[i]<<" ";
//		}
//		cout<<endl;
		queue<node> p;
		int ans=0;
		for(int i=2;i<=tot;i++){
			if(shu[i]==0){
				if(z[i]==1) {
					ans++;	p.push(node{i,z[i]});
				}
			
			}
		}
//		cout<<p.size()<<endl;
//		cout<<ans<<endl;
		while(!p.empty()){
			node t=p.front();
			p.pop();
			vi[qian[t.i]]++;
//			o[qian[t.i]]+=t.x;
//			cout<<t.i<<" "<<t.x<<endl;
			if(vi[qian[t.i]]==shu[qian[t.i]]&&qian[t.i]!=1){
				ans-=shu[qian[t.i]];
				ans++;
				p.push(node{qian[t.i],0});
			}
		}
		cout<<ans<<endl;
	}
}
```

