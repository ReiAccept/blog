import type { Localized } from '../content'

/**
 * Friend links are kept as typed data (instead of the old TOML file) so the
 * list can be imported, validated and rendered directly by the app.
 */
export type Friend = {
  name: string
  url: string
  avatar: string
  desc: Localized
}

export const friends: Friend[] = [
  {
    name: '王神仙',
    url: 'https://www.cnblogs.com/onglublog/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=632599557&s=640',
    desc: {
      zh: 'WSX%%%, ICPC金牌爷',
      en: 'WSX%%%, ICPC gold medalist',
    },
  },
  {
    name: '凯爷',
    url: 'https://kaizynx.github.io/',
    avatar: 'https://cdn.jsdelivr.net/gh/KaizynX/cdn/img/custom/avatar.gif',
    desc: {
      zh: '凯爷%%%, ICPC WP finalist',
      en: 'Kai%%%, my idol and a WF finalist',
    },
  },
  {
    name: '嘤嘤嘤嘤嘤',
    url: 'https://withghost.github.io/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1023461968&s=640',
    desc: {
      zh: '超可爱！',
      en: 'Super cute!',
    },
  },
  {
    name: '蓝天',
    url: 'https://fubluesky.github.io/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=936992197&s=640',
    desc: {
      zh: '可爱蓝天',
      en: "Pretty cute",
    },
  },
  {
    name: '无限ucw',
    url: 'https://ucw.moe/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1840214768&s=640',
    desc: {
      zh: 'Eloim Essaim Eloim Essaim、我は求め诉えたり。',
      en: 'Eloim Essaim Eloim Essaim — I have come in answer to your call.',
    },
  },
  {
    name: "涩队CSL's blog",
    url: 'https://cubercsl.site/',
    avatar: 'https://avatars.githubusercontent.com/u/22931465',
    desc: {
      zh: 'The end is always near.',
      en: 'The end is always near.',
    },
  },
  {
    name: 'koto-k',
    url: 'https://www.cnblogs.com/koto-k/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2557746160&s=640',
    desc: {
      zh: 'Keep your feet on your track.',
      en: 'Keep your feet on your track.',
    },
  },
  {
    name: '刻师傅！',
    url: 'https://blog.mauve.icu/',
    avatar: 'https://hukeqing.github.io/image/about/avatar.png',
    desc: {
      zh: '欢迎，许久不见，甚是想念',
      en: "Welcome — it's been a while, and I've missed you",
    },
  },
  {
    name: '鲍鲍',
    url: 'https://zning-b.github.io/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1026106774&s=640',
    desc: {
      zh: '是蓝天天的男朋友哦',
      en: "",
    },
  },
  {
    name: 'Season',
    url: 'https://season.ac/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1342367762&s=640',
    desc: {
      zh: '清纯学弟',
      en: '',
    },
  },
  {
    name: '残城三梦 / Livinfly',
    url: 'https://livinfly.github.io/',
    avatar: 'https://avatars.githubusercontent.com/u/65482183',
    desc: {
      zh: '坏了，我成学妹了',
      en: "",
    },
  },
  {
    name: 'kernel.bin',
    url: 'https://kernelbin.cn/',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1160386205&s=640',
    desc: {
      zh: 'OIer / ACMer / Win32 dev',
      en: 'OIer / ACMer / Win32 dev',
    },
  },
].sort((a, b) => b.name.localeCompare(a.name))
