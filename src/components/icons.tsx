import type { IconType } from 'react-icons'
import {
  LuBookOpen,
  LuGamepad2,
  LuLaptop,
  LuMail,
  LuMonitor,
  LuSmartphone,
} from 'react-icons/lu'
import {
  SiCodeforces,
  SiDota2,
  SiGithub,
  SiRss,
  SiX,
} from 'react-icons/si'
import type { GameIcon, GearIcon, SocialIcon } from '../content'

type IconSpec = {
  Icon: IconType
  className: string
}

export const socialIcons: Record<SocialIcon, IconSpec> = {
  blog: { Icon: LuBookOpen, className: 'text-sky-500' },
  github: { Icon: SiGithub, className: 'text-slate-900 dark:text-slate-100' },
  twitter: { Icon: SiX, className: 'text-slate-900 dark:text-slate-100' },
  email: { Icon: LuMail, className: 'text-amber-500' },
  rss: { Icon: SiRss, className: 'text-orange-500' },
  codeforces: { Icon: SiCodeforces, className: 'text-blue-600 dark:text-blue-400' },
}

export const gearIcons: Record<GearIcon, IconType> = {
  monitor: LuMonitor,
  laptop: LuLaptop,
  smartphone: LuSmartphone,
}

export const gameIcons: Record<GameIcon, IconType> = {
  starcraft: LuGamepad2,
  dota2: SiDota2,
  switch: LuGamepad2,
}

export const gameToneClasses: Record<'amber' | 'rose' | 'sky', string> = {
  amber:
    'bg-amber-50 text-amber-600 ring-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  rose:
    'bg-rose-50 text-rose-600 ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
  sky:
    'bg-sky-50 text-sky-600 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20',
}
