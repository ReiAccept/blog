export type Lang = 'zh' | 'en'

export type Localized<T = string> = {
  zh: T
  en: T
}

export type SocialIcon = 'blog' | 'github' | 'twitter' | 'email' | 'rss' | 'codeforces'

export type Social = {
  id: SocialIcon
  name: Localized
  handle: string
  href: string
}

export type GearIcon = 'monitor' | 'laptop' | 'smartphone'

export type GearGroup = {
  id: string
  name: Localized
  icon: GearIcon
  badges: Array<{ src: string; alt: string }>
}

export type GameIcon = 'starcraft' | 'dota2' | 'switch'

export type Game = {
  id: string
  name: Localized
  meta: Localized
  accountLabel: Localized
  account: string
  icon: GameIcon
  tone: 'amber' | 'rose' | 'sky'
}

export type TimelineItem = {
  date: string
  title: Localized
  note?: Localized
}

export type CopyrightItem = {
  text: Localized
}

export type FriendsPageContent = {
  title: Localized
  intro: Localized
  count: Localized
  metaDescription: Localized
  applyTitle: Localized
  applyBody: Localized
  applyCta: Localized
  applySubject: Localized
  applyEmail: string
}

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

export const site = {
  name: 'ReiAC',
  title: "ReiAC's Index",
  handle: '@ReiAccept',
  index: 'https://rei.ac',
  blog: 'https://blog.rei.ac',
  github: 'https://github.com/ReiAccept',
  avatar: asset('avatar.png'),
  cover: asset('cover.webp'),
  coverSmall: asset('cover-960.webp'),
} as const

export const nav = {
  brand: { zh: site.title, en: site.title },
  blog: { zh: '博客', en: 'Blog' },
  friends: { zh: '友链', en: 'Friends' },
  about: { zh: '关于', en: 'About' },
} satisfies Record<string, Localized>

export const ui = {
  skipToContent: { zh: '跳到主要内容', en: 'Skip to content' },
  mainNav: { zh: '主导航', en: 'Main navigation' },
  language: { zh: '语言', en: 'Language' },
  switchToEnglish: { zh: '切换到 English', en: 'Switch to English' },
  switchToChinese: { zh: '切换到中文', en: 'Switch to Chinese' },
  themeToLight: { zh: '切换到浅色模式', en: 'Switch to light mode' },
  themeToDark: { zh: '切换到深色模式', en: 'Switch to dark mode' },
  copy: { zh: '复制', en: 'Copy' },
  copied: { zh: '已复制', en: 'Copied' },
  backToTop: { zh: '回到顶部', en: 'Back to top' },
  externalLink: { zh: '在新标签页打开', en: 'Opens in a new tab' },
} satisfies Record<string, Localized>

export const hero = {
  name: site.name,
  handle: site.handle,
  role: {
    zh: '什么都写工程师',
    en: 'Full-stack engineer',
  } satisfies Localized,
  avatarAlt: {
    zh: 'ReiAC 的头像：诺艾尔（天体的秩序）',
    en: "ReiAC's avatar: Noelle from Celestial Method",
  } satisfies Localized,
}

export const intro: Localized[] = [
  {
    zh: '兴趣广泛，CS/EE 领域很多方向都有涉猎',
    en: "Broad interests — I've dabbled in many corners of CS/EE, enough to know a little about each.",
  },
  {
    zh: '从小学开始的“图吧”垃圾佬，大船服务器是真爱（家里Homelab除了核心路由外全是大船二手服务器硬件）',
    en: "Ex-enterprise server pulls are my true love(In my home lab, everything except the core router is second-hand server hardware from those big shipments).",
  },
  {
    zh: '自动化工具爱好者（也许是因为我有点懒，计算机能靠谱地自己动，就不用我动了）',
    en: "Automation tooling enthusiast — maybe because I'm a little lazy: if a computer can reliably do it for me, it should.",
  },
  {
    zh: '不工作时用 打游戏/看番/古法编程/古法配Homelab 来放松心情和消磨时间',
    en: 'On non-work projects I am an old-school, artisanal programming enthusiast — tinkering with side projects at home is how I relax.',
  },
  {
    zh: '坚定的认为开源是计算机的未来',
    en: 'I firmly believe that open source is the future of computing.',
  },
  {
    zh: '目前在某公司网络安全实验室工作，做密码应用和实现这一块（我的密码学其实是大学时炒币接触炒币，从而去研究了区块链相关原理从而学的hhhhh）',
    en: "Currently working in a company's cybersecurity lab on cryptographic applications and implementations. (I actually got into crypto by trading coins in college, which led me to study blockchain fundamentals — and somehow I stumbled into this industry, hahaha.)",
  },
  {
    zh: '头像是[诺艾尔（天体的秩序）](https://zh.moegirl.org.cn/%E8%AF%BA%E8%89%BE%E5%B0%94%28%E5%A4%A9%E4%BD%93%E7%9A%84%E7%A7%A9%E5%BA%8F%29)，不是[珂朵莉](https://zh.moegirl.org.cn/%E7%8F%82%E6%9C%B5%E8%8E%89)。',
    en: 'The avatar is [Noel from Celestial Method](https://en.wikipedia.org/wiki/Celestial_Method), not [Chtholly](https://zh.moegirl.org.cn/%E7%8F%82%E6%9C%B5%E8%8E%89).',
  },
]

export type CodeforcesData = {
  handle: string
  profileUrl: string
  kicker: Localized
  fallback: {
    rating: number
    maxRating: number
    rank: string
  }
  labels: {
    rating: Localized
    peak: Localized
    history: Localized
    live: Localized
    snapshot: Localized
    syncing: Localized
    view: Localized
    chart: Localized
  }
}

export const codeforces: CodeforcesData = {
  handle: 'ReiAC',
  profileUrl: 'https://codeforces.com/profile/ReiAC',
  kicker: { zh: '算法竞赛', en: 'Competitive programming' },
  fallback: {
    rating: 2273,
    maxRating: 2273,
    rank: 'master',
  },
  labels: {
    rating: { zh: '当前 Rating', en: 'Current rating' },
    peak: { zh: '最高 Rating', en: 'Peak rating' },
    history: { zh: 'Rating 变化', en: 'Rating history' },
    live: { zh: '实时', en: 'Live' },
    snapshot: { zh: '快照', en: 'Snapshot' },
    syncing: { zh: '同步中', en: 'Syncing' },
    view: { zh: '查看 Codeforces 主页', en: 'View Codeforces profile' },
    chart: { zh: 'Codeforces Rating 变化图', en: 'Codeforces rating history chart' },
  },
}

export const socials: Social[] = [
  {
    id: 'blog',
    name: { zh: '博客', en: 'Blog' },
    handle: 'blog.rei.ac',
    href: site.blog,
  },
  {
    id: 'github',
    name: { zh: 'GitHub', en: 'GitHub' },
    handle: '@ReiAccept',
    href: site.github,
  },
  {
    id: 'twitter',
    name: { zh: 'Twitter', en: 'Twitter' },
    handle: '@ReiAccept',
    href: 'https://twitter.com/ReiAccept',
  },
  {
    id: 'email',
    name: { zh: '邮箱', en: 'Email' },
    handle: 'lhh@live.com',
    href: 'mailto:lhh@live.com',
  },
  {
    id: 'rss',
    name: { zh: 'RSS 订阅', en: 'RSS' },
    handle: '/index.xml',
    href: `${site.blog}/index.xml`,
  },
  {
    id: 'codeforces',
    name: { zh: 'Codeforces', en: 'Codeforces' },
    handle: '@ReiAC',
    href: codeforces.profileUrl,
  },
]

export const gear: GearGroup[] = [
  {
    id: 'desktop',
    name: { zh: '台式机', en: 'Desktop' },
    icon: 'monitor',
    badges: [
      { src: asset('badges/7800x3d.svg'), alt: 'AMD Ryzen 7 7800X3D' },
      { src: asset('badges/rtx4070.svg'), alt: 'NVIDIA GeForce RTX 4070' },
      { src: asset('badges/archlinux.svg'), alt: 'Arch Linux' },
    ],
  },
  {
    id: 'laptop',
    name: { zh: '笔记本', en: 'Laptop' },
    icon: 'laptop',
    badges: [
      { src: asset('badges/macbookpro2021.svg'), alt: 'MacBook Pro 2021' },
      { src: 'https://img.shields.io/static/v1?style=for-the-badge&message=macOS%2027&color=000000&logo=macOS&logoColor=FFFFFF&label=', alt: 'macOS 27' },
    ],
  },
  {
    id: 'mobile',
    name: { zh: '手机', en: 'Mobile' },
    icon: 'smartphone',
    badges: [
      { src: asset('badges/oneplus15.svg'), alt: 'OnePlus 15' },
      { src: asset('badges/iphone16pro.svg'), alt: 'iPhone 16 Pro' },
    ],
  },
]

export const games: Game[] = [
  {
    id: 'sc2',
    name: { zh: '星际争霸2', en: 'StarCraft II' },
    meta: { zh: '国服 · 宗师', en: 'CN · Grandmaster' },
    accountLabel: { zh: '好友 ID', en: 'Friend ID' },
    account: 'Spaceless#5104',
    icon: 'starcraft',
    tone: 'amber',
  },
  {
    id: 'dota2',
    name: { zh: 'DOTA2', en: 'DOTA2' },
    meta: { zh: '超凡入圣', en: 'Divine' },
    accountLabel: { zh: '好友 ID', en: 'Friend ID' },
    account: '138379332',
    icon: 'dota2',
    tone: 'rose',
  },
  {
    id: 'switch',
    name: { zh: 'Nintendo Switch', en: 'Nintendo Switch' },
    meta: { zh: '第一方游戏启动器', en: 'Nintendo first-party game launcher' },
    accountLabel: { zh: '好友 ID', en: 'Friend ID' },
    account: 'SW-0298-7511-7319',
    icon: 'switch',
    tone: 'sky',
  },
]

export const timeline: TimelineItem[] = [
  {
    date: '2026.11.01',
    title: { zh: '重构 About 页面', en: 'Refactored the About page' },
  },
  {
    date: '2025.05.25',
    title: { zh: '迁移回 GitHub Pages', en: 'Migrated back to GitHub Pages' },
  },
  {
    date: '2022.01.25',
    title: {
      zh: '更换静态站生成器到 Hugo，并迁移到 Azure Static Web Apps 和 Cloudflare Pages',
      en: 'Switched the static site generator to Hugo, then migrated to Azure Static Web Apps and Cloudflare Pages',
    },
  },
  {
    date: '2021.12.22',
    title: { zh: '更换域名为 rei.ac', en: 'Moved to the rei.ac domain' },
  },
  {
    date: '2019.09.01',
    title: { zh: '更换域名为 spaceless.me', en: 'Moved to the spaceless.me domain' },
  },
  {
    date: '2017.10.01',
    title: {
      zh: '使用 Hexo 静态站生成器并迁移到 GitHub Pages',
      en: 'Adopted the Hexo static site generator and migrated to GitHub Pages',
    },
  },
  {
    date: '2015.04.03',
    title: {
      zh: '于 Red Hat OpenShift 上基于 WordPress 建站',
      en: 'Started the site on WordPress, hosted on Red Hat OpenShift',
    },
  },
  {
    date: '2013.XX.XX',
    title: {
      zh: '在初中信息课上接触到 Adobe Dreamweaver，开始研究做站点',
      en: 'Discovered Adobe Dreamweaver in a middle-school IT class and started experimenting with building websites',
    },
    note: {
      zh: '但是没有支付方式买一个服务器',
      en: '…though I had no way to pay for a server',
    },
  },
]

export const copyright: CopyrightItem[] = [
  {
    text: {
      zh: '除非注明，本博客所有文章皆为原创。',
      en: 'Unless otherwise noted, all posts on this blog are original.',
    },
  },
  {
    text: {
      zh: '除非另有声明，本博客之原创文章采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 进行许可。',
      en: 'Unless otherwise stated, original posts are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en).',
    },
  },
  {
    text: {
      zh: '转载请同时注明原文链接和作者名字。',
      en: 'When reposting, please credit both the original link and the author.',
    },
  },
  {
    text: {
      zh: '本博客运行于 [GitHub Pages](https://pages.github.com/)，源代码位于 [GitHub 仓库](https://github.com/ReiAccept/blog)；本页源码单独位于 about 分支',
      en: 'This blog runs on [GitHub Pages](https://pages.github.com/); the source code lives in the [GitHub repository](https://github.com/ReiAccept/blog); the source code for this page is separately located in the about branch.',
    },
  }
]

export const friendsPage: FriendsPageContent = {
  title: { zh: '友链', en: 'Friends' },
  intro: {
    zh: '这里收录了一些朋友的站点',
    en: 'A small collection of sites run by friends.',
  },
  count: { zh: '位朋友', en: 'friends' },
  metaDescription: {
    zh: 'ReiAC 的朋友们：一起写博客、折腾技术的站点收藏。',
    en: 'Friends of ReiAC — blogs and sites worth a visit.',
  },
  applyTitle: { zh: '想交换友链？', en: 'Want to exchange links?' },
  applyBody: {
    zh: '欢迎交换友链。请把站点名称、链接、头像地址和一句介绍发给我，我会尽快回复。',
    en: 'I am happy to exchange links. Send me your site name, URL, avatar and a one-line introduction, and I will reply as soon as I can.',
  },
  applyCta: { zh: '发送邮件', en: 'Send an email' },
  applySubject: { zh: '友链申请', en: 'Friend link request' },
  applyEmail: 'lhh@live.com',
}

export const sections = {
  codeforces: { zh: 'Codeforces', en: 'Codeforces' },
  socials: { zh: '社交', en: 'Socials' },
  gear: { zh: '设备', en: 'Devices' },
  games: { zh: '游戏', en: 'Games' },
  timeline: { zh: '站点历程', en: 'Site timeline' },
  copyright: { zh: '版权说明', en: 'Copyright' },
  colophon: { zh: '关于本页', en: 'Colophon' },
} satisfies Record<string, Localized>

export const colophon = {
  body: {
    zh: '本页使用 Vite、React 19、TypeScript 7 和 Tailwind CSS 4 构建',
    en: 'Built with Vite, React 19, TypeScript 7 and Tailwind CSS 4.',
  } satisfies Localized,
  tech: ['React 19', 'Vite 8', 'TypeScript 7', 'Tailwind 4'],
  source: { zh: '博客源码', en: 'Blog source' },
  sourceUrl: 'https://github.com/ReiAccept/blog',
}

export const footer = {
  compiler: '0 Warning(s), 0 Error(s)',
  copyrightName: site.name,
  designInspired: { zh: '开源:', en: 'Src: ' },
  builtWith: { zh: '使用', en: 'Built with' },
}
