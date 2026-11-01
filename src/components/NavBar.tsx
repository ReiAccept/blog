import { useEffect, useState } from 'react'
import { LuArrowUpRight, LuBookOpen, LuUser, LuUsers } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'
import { nav, site, ui } from '../content'
import { cx } from '../lib/cx'
import { langPath, useI18n } from '../lib/i18n'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function NavBar() {
  const { lang, pick } = useI18n()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const solid = scrolled || hovered

  const aboutPath = langPath(lang)
  const friendsPath = `${aboutPath}/friends`
  const onFriends = location.pathname === friendsPath
  const onAbout = !onFriends

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cx(
        'fixed inset-x-0 top-0 z-50 h-[60px] transition-[background-color,box-shadow,border-color] duration-300',
        solid
          ? 'border-b border-slate-200/70 bg-white/90 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-[0_4px_20px_-12px_rgba(0,0,0,0.8)]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label={pick(ui.mainNav)}
        className="mx-auto flex h-full max-w-[1200px] items-center gap-3 px-4 sm:px-6"
      >
        <a
          href={site.index}
          className="group flex min-w-0 items-center gap-3"
          aria-label={site.title}
        >
          <img
            src={site.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white/75 transition-transform duration-300 group-hover:scale-105 dark:ring-slate-700"
          />
          <span
            className={cx(
              'truncate text-lg font-semibold tracking-tight transition-opacity duration-300',
              solid ? 'opacity-100' : 'opacity-0',
              solid ? 'text-slate-900 dark:text-white' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]',
            )}
          >
            {pick(nav.brand)}
          </span>
        </a>

        <div className="grow" />

        <div
          className={cx(
            'hidden items-center gap-1 transition-opacity duration-300 sm:flex',
            solid ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <a
            href={site.index}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            {pick(nav.blog)}
            <LuArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <Link
            to={friendsPath}
            aria-current={onFriends ? 'page' : undefined}
            className={cx(
              'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
              onFriends
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white',
            )}
          >
            {pick(nav.friends)}
          </Link>
          <Link
            to={aboutPath}
            aria-current={onAbout ? 'page' : undefined}
            className={cx(
              'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
              onAbout
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white',
            )}
          >
            {pick(nav.about)}
          </Link>
        </div>

        {onFriends ? (
          <Link
            to={aboutPath}
            aria-label={pick(nav.about)}
            className={cx(
              'inline-flex size-8 items-center justify-center rounded-full ring-1 transition-colors duration-200 sm:hidden',
              solid
                ? 'bg-slate-100 text-slate-500 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
                : 'bg-slate-950/35 text-white ring-white/25 backdrop-blur-md',
            )}
          >
            <LuUser className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            to={friendsPath}
            aria-label={pick(nav.friends)}
            className={cx(
              'inline-flex size-8 items-center justify-center rounded-full ring-1 transition-colors duration-200 sm:hidden',
              solid
                ? 'bg-slate-100 text-slate-500 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
                : 'bg-slate-950/35 text-white ring-white/25 backdrop-blur-md',
            )}
          >
            <LuUsers className="size-4" aria-hidden="true" />
          </Link>
        )}

        <a
          href={site.index}
          target="_blank"
          rel="noreferrer"
          aria-label={pick(nav.blog)}
          className={cx(
            'inline-flex size-8 items-center justify-center rounded-full ring-1 transition-colors duration-200 sm:hidden',
            solid
              ? 'bg-slate-100 text-slate-500 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
              : 'bg-slate-950/35 text-white ring-white/25 backdrop-blur-md',
          )}
        >
          <LuBookOpen className="size-4" aria-hidden="true" />
        </a>

        <LanguageToggle solid={solid} />
        <ThemeToggle solid={solid} />
      </nav>
    </header>
  )
}
