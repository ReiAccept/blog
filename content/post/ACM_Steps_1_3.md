+++
title = "ACM Steps 1-3"
date = "2021-01-05T00:52:51+08:00"
tags = ["算法竞赛"]
description = ""
+++

ACM Steps 不能跳着刷好蛋疼啊，非要去写水题

## Section One

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int a,b;
    while(cin>>a>>b)
    {
        cout<<a+b<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int a,b;
    while(cin>>a>>b)
    {
        cout<<a+b<<endl;
    }
    return;
}

signed main()
{
    int T=read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int a,b;
    while(cin>>a>>b && (a || b))
    {
        cout<<a+b<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int a,b;
    while(cin>>a>>b && (a || b))
    {
        cout<<a+b<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int n=read(),ans=0;
    while(n--) ans+=read();
    cout<<ans<<endl;
    return;
}

signed main()
{
    int T=read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

void work()
{
    int ans=0,n;
    while(cin>>n)
    {
        ans=0;
        while(n--) ans+=read();
        cout<<ans<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
	for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int a,b;

void work()
{
    while(cin>>a>>b)
    {
        cout<<a+b<<endl<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int a, i, sum, j, N, n;
    cin >> N;
    while (N--)
    {
        sum = 0;
        cin >> n;
        while (n--)
        {
            cin >> a;
            sum += a;
        }
        cout << sum << endl;
        if (N != 0)
        {
            printf("\n");
        }
    }

    return 0;
}
```

## Section Two

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int n;

void work()
{
    while(n=read())
    {
        int now=0,ans=0;
        while(n--)
        {
            int x=read();
            if(x>now) ans+=(x-now)*6;
            if(x<now) ans+=(now-x)*4;
            ans+=5;
            now=x;
        }
        cout<<ans<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int a,b;

void work()
{
    while(scanf("%x%x", &a, &b) != EOF)  printf("%d\n", a + b);  
    return;
}

signed main()
{
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include <bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x, y) memset(x, y, sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF = 0x3f3f3f3f;

int read()
{
    char c;
    int num, f = 1;
    while (c = (char)getchar(), !isdigit(c))
        if (c == '-')
            f = -1;
    num = (int)(c - '0');
    while (c = (char)getchar(), isdigit(c))
        num = num * 10 + (int)(c - '0');
    return num * f;
}
void prt(int x)
{
    if (x < 0)
    {
        putchar('-');
        x = -x;
    }
    if (x > 9)
        prt(x / 10);
    putchar((char)(x % 10 + '0'));
}

string s;
int l, i, j, k, n;

void work()
{
    getline(cin, s);
    l = s.length();
    for (k = 0, j = -1; k <= l; k++)
    {
        if (s[k] == ' ' || k == l)
        {
            for (i = k - 1; i > j; i--)
                cout << s[i];
            if (k != l)
                cout << ' ';
            else
                cout << endl;
            j = k;
        }
    }
    return;
}

signed main()
{
    int T = read();
    for (int Case = 1; Case <= T; Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int r,e,c;

void work()
{
    r=read();e=read();c=read();
    if(e-c>r)cout<<"advertise"<<endl;
    else if(e-c<r)cout<<"do not advertise"<<endl;
    else cout<<"does not matter"<<endl;
    return;
}

signed main()
{
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int y,n;

inline bool isleap(int year)
{
    if ((year%4==0 && year%100!=0) || year%400==0) return true;
    return false;
}

void work()
{
    y=read();n=read();
    while(!isleap(y))y++;
    n--;
    while(n)
    {
        y+=4;
        if(isleap(y))n--;
    }
    cout<<y<<endl;
    return;
}

signed main()
{
    int T=read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int todec(int x,int y)
{
    int ans=0,yx=1;
    while(x)
    {
        ans+=((x%10)*yx);
        yx*=y;
        x/=10;
    }
    return ans;
}
void work()
{
    int n=0;
    while(cin>>n)
    {
        int sum=0;
        while(n--)
        {
            int x=read();
            int y=read();
            sum+=todec(x,y);
        }
        cout<<sum<<endl;
        getchar();
    }
    return;
}

signed main()
{
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include<bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x,y) memset(x,y,sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF=0x3f3f3f3f;

int read(){char c;int num,f=1;while(c=(char)getchar(),!isdigit(c))if(c=='-')f=-1;num=(int)(c-'0');while(c=(char)getchar(),isdigit(c))num=num*10+(int)(c-'0');return num*f;}
void prt(int x){if(x<0){putchar('-');x=-x;}if(x>9)prt(x/10);putchar((char)(x%10+'0'));}

int ten(int m)
{
    int sum=0;
    while(m)
    {
        sum+=m%10;
        m/=10;
    }
    return sum;
}
 
int twelve(int m)
{
    int sum=0;
    while(m)
    {
        sum+=m%12;
        m/=12;
    }
    return sum;
}
 
int sixteen(int m)
{
    int sum=0;
    while(m)
    {
        sum+=m%16;
        m/=16;
    }
    return sum;
}
 
inline bool equal(int a,int b,int c)
{
    if(a==b && b==c) return true;
    return false;
}

void work()
{
    for(int i=2992;i<=9999;i++)
    {
        if(equal(ten(i),twelve(i),sixteen(i))) cout<<i<<endl;
    }
    return;
}

signed main()
{
    int T=1;//read();
    for(int Case=1;Case<=T;Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

```cpp
#include <bits/stdc++.h>
#define maxn 100

using namespace std;

int b,n,m,sum;
int a[maxn];
string s;

int main()
{
    
    while (cin >> n)
    {
        for (int i = 0; i < n; i++)
        {
            cout << "He/She is from ";
            cin >> s;
            string substr = s.substr(0, 2);
            int sub = (substr[0] - '0') * 10 + substr[1] - '0';
            switch (sub)
            {
            case 33:
                cout << "Zhejiang";
                break;
            case 11:
                cout << "Beijing";
                break;
            case 71:
                cout << "Taiwan";
                break;
            case 81:
                cout << "Hong Kong";
                break;
            case 82:
                cout << "Macao";
                break;
            case 54:
                cout << "Tibet";
                break;
            case 21:
                cout << "Liaoning";
                break;
            case 31:
                cout << "Shanghai";
                break;
            }
            cout << ",and his/her birthday is on ";
            substr = s.substr(6, 4);
            string substrmonth = s.substr(10, 2);
            string substrday = s.substr(12, 2);
            cout << substrmonth << "," << substrday << "," << substr;
            cout << " based on the table." << endl;
        }
    }
    return 0;
}
```

## Section Three

```cpp
#include <bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define MMST(x, y) memset(x, y, sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF = 0x3f3f3f3f;

int read()
{
    char c;
    int num, f = 1;
    while (c = (char)getchar(), !isdigit(c))
        if (c == '-')
            f = -1;
    num = (int)(c - '0');
    while (c = (char)getchar(), isdigit(c))
        num = num * 10 + (int)(c - '0');
    return num * f;
}
void prt(int x)
{
    if (x < 0)
    {
        putchar('-');
        x = -x;
    }
    if (x > 9)
        prt(x / 10);
    putchar((char)(x % 10 + '0'));
}

int n;
int a[1003], b[1003];

void work()
{
    while (n = read())
    {
        for (int i = 1; i <= n; i++)
            a[i] = read();
        for (int i = 1; i <= n; i++)
            b[i] = read();
        sort(a + 1, a + 1 + n, [](int x, int y) { return x > y; });
        sort(b + 1, b + 1 + n, [](int x, int y) { return x > y; });
        int ji = 0, i = 1, j = 1, sum = 0, k = n, f = n;
        while (ji < n)
        {
            if (b[j] > a[i])
            {
                sum -= 200;
                j++;
                k--;
                ji++;
                continue;
            } //如果king的比tian的快马快 用tian的慢马对king的快马
            if (b[j] == a[i])
            { //如果相等
                if (b[f] < a[k])
                {
                    f--;
                    k--;
                    sum += 200;
                    ji++;
                    continue;
                } //看两人的慢马 tian的慢马比king的慢马快则比
                if (b[j] > a[k])
                {
                    sum -= 200;
                    k--;
                    j++;
                    ji++;
                }
                else
                {
                    k--;
                    j++;
                    ji++;
                }
                continue;
            }
            if (b[j] < a[i])
            {
                sum += 200;
                j++;
                i++;
                ji++;
                continue;
            } //如果tian的比king的快马快 直接比
        }
        cout << sum << endl;
    }
    return;
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T = 1; //read();
    for (int Case = 1; Case <= T; Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

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

int n,m,g,sum;
int p[13];
struct stu
{
    string s;
    int pts;
}ks[1003];

void INIT()
{
    
}

void work()
{
    while(n=read())
    {
        for(int i=1;i<=n;i++) ks[i].pts=0;
        m=read();g=read();sum=0;
        for(int i=1;i<=m;i++) p[i]=read();
        for(int nx,i=1;i<=n;i++)
        {
            cin>>ks[i].s;
            nx=read();
            while(nx--)ks[i].pts+=p[read()];
            if(ks[i].pts>=g)sum++;
        }
        sort(ks+1,ks+1+n,[](stu a,stu b){
            if(a.pts!=b.pts) return a.pts>b.pts;
            else return a.s<b.s;
            });
        cout<<sum<<endl;
        for(int i=1;i<=n;i++)
        {
            if(ks[i].pts>=g) cout<<ks[i].s<<" "<<ks[i].pts<<endl;
            else break;
        }
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
struct jian
{
    int a,b;
}jx[53];

void work()
{
    n=read();
    for(int i=1;i<=n;i++)
    {
        jx[i].a=read();
        jx[i].b=read();
    }
    sort(jx+1,jx+1+n,[](jian a,jian b){return a.a<b.a;});
    for(int a,b,i=1;i<=n;i++)
    {
        a=jx[i].a;b=jx[i].b;
        for(int j=1;j<=b;j++)
        {
            for(int i=1;i<=a;i++)
        {
            if(i==1)cout<<">+";
            else if(i==a)cout<<"+>"<<endl;
            else cout<<'-';
        }
        }
        cout<<endl;
    }
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
int a[13];

void work()
{
    n=read();
    for(int i=1;i<=n;i++) a[i]=read();
    sort(a+1,a+1+n);
    cout<<a[2]<<endl;
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
int a[103],b[103];

void work()
{
    while(n=read())
    {
        for(int i=1;i<=n;i++)a[i]=read();
        for(int i=1;i<=n;i++)b[i]=read();
        int ax=0,bx=0;
        sort(a+1,a+1+n);
        sort(b+1,b+1+n);
        for(int i=1;i<=n;i++)
        {
            if(a[i]>b[i])ax+=2;
            else if(a[i]<b[i])bx+=2;
            else ax++,bx++;
        }
        printf("%lld vs %lld\n",ax,bx);
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
struct wood
{
    int l,w;
}a[5003];

bool vis[5003];

void work()
{
    n=read();
    mmst0(vis);
    for(int i=1;i<=n;i++)
    {
        a[i].l=read();
        a[i].w=read();
    }
    sort(a+1,a+1+n,[](wood a,wood b){
        if(a.l!=b.l) return a.l<b.l;
        else return a.w<b.w;
        });
    int ans=0,sum=0;
    while(sum<n)
    {
        int tl=0,tw=0;
        ans++;
        for(int i=1;i<=n;i++)
        {
            if(a[i].l>=tl && a[i].w>=tw && (!vis[i]))
            {
                vis[i]=true;
                sum++;
                tl=a[i].l;
                tw=a[i].w;
            }
        }
    }
    cout<<ans<<endl;
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

int a[5];

void work()
{
    cin>>a[1]>>a[2]>>a[3]>>a[4];
    while(true)
    {
        sort(a+1,a+4);
        int last1=a[1];
        bool fst=true;
        do
        {
            if(a[1]==0) continue;
            if(last1!=a[1] || fst)
            {
                if(!fst)cout<<endl;
                last1=a[1];
                fst=false;
                cout<<a[1]<<a[2]<<a[3]<<a[4];
            }
            else cout<<" "<<a[1]<<a[2]<<a[3]<<a[4];
        } while (next_permutation(a+1,a+5));
        cout<<endl;
        cin>>a[1]>>a[2]>>a[3]>>a[4];
        if(!a[1] && !a[2] && !a[3] && !a[4]) break;
        else cout<<endl;
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

```cpp
#include <bits/stdc++.h>
//#include<bits/extc++.h>
#define int long long
//#define int __int128
#define ull unsigned long long
#define mmst0(x) memset(x, 0, sizeof(x))

using namespace std;
//using namespace __gnu_pbds;

const int INF = 0x3f3f3f3f;

int read()
{
    char c;
    int num, f = 1;
    while (c = (char)getchar(), !isdigit(c))
        if (c == '-')
            f = -1;
    num = (int)(c - '0');
    while (c = (char)getchar(), isdigit(c))
        num = num * 10 + (int)(c - '0');
    return num * f;
}
void prt(int x)
{
    if (x < 0)
    {
        putchar('-');
        x = -x;
    }
    if (x > 9)
        prt(x / 10);
    putchar((char)(x % 10 + '0'));
}

void work()
{
    int sn, s[1000], tsn, m, range, score, i, j;
    while (scanf("%d", &sn) != EOF)
    {
        range = 1;
        i = 0;
        while (scanf("%d%d", &tsn, &m), tsn || m)
        {
            if (tsn == sn)
                score = m;
            s[i++] = m;
        }
        for (j = 0; j < i; j++)
            if (s[j] > score)
                range++;
        printf("%d\n", range);
    }
}

signed main()
{
    //ios::sync_with_stdio(false);cin.tie(NULL);
    int T = 1; //read();
    for (int Case = 1; Case <= T; Case++)
    {
        //printf("Case #%d: ",Case);
        work();
    }
    return 0;
}
```

