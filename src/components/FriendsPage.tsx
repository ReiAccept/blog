import { useState } from 'react'
import { LuArrowUpRight, LuMail, LuUsers } from 'react-icons/lu'
import { friendsPage, ui } from '../content'
import { friends, type Friend } from '../data/friends'
import { useI18n } from '../lib/i18n'
import { usePageMeta } from '../lib/seo'
import { PageLayout } from './PageLayout'

function FriendCard({ friend }: { friend: Friend }) {
  const { pick } = useI18n()
  const [avatarFailed, setAvatarFailed] = useState(false)
  const desc = pick(friend.desc)

  let host = friend.url
  try {
    host = new URL(friend.url).hostname
  } catch {
    // Fall back to the raw URL if it cannot be parsed.
  }

  return (
    <a
      href={friend.url}
      target="_blank"
      rel="noreferrer"
      className="card group flex h-full items-start gap-4 p-4"
    >
      <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700">
        {avatarFailed || !friend.avatar ? (
          <span className="text-xl font-semibold text-slate-500 dark:text-slate-300">
            {Array.from(friend.name)[0] ?? '?'}
          </span>
        ) : (
          <img
            src={friend.avatar}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setAvatarFailed(true)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="flex items-center gap-1 text-base font-medium text-slate-900 dark:text-slate-100">
          <span className="truncate">{friend.name}</span>
          <LuArrowUpRight
            className="size-3.5 shrink-0 text-slate-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-slate-500"
            aria-hidden="true"
          />
        </h2>
        {desc ? (
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
        ) : null}
        <span className="mt-2 block truncate font-mono text-[11px] text-slate-400 dark:text-slate-500">
          {host}
        </span>
      </div>

      <span className="sr-only"> ({pick(ui.externalLink)})</span>
    </a>
  )
}

export function FriendsPage() {
  const { lang, pick } = useI18n()
  usePageMeta(lang === 'zh' ? '友链' : 'Friends', pick(friendsPage.metaDescription))

  const subject = encodeURIComponent(pick(friendsPage.applySubject))
  const emailHref = `mailto:${friendsPage.applyEmail}?subject=${subject}`

  return (
    <PageLayout>
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-500/15 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20">
          <LuUsers className="size-8" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {pick(friendsPage.title)}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base dark:text-slate-400">
            {pick(friendsPage.intro)}
          </p>
        </div>

        <div className="grow" />

        <span className="inline-flex shrink-0 items-center self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200/80 sm:self-center dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
          {friends.length} {pick(friendsPage.count)}
        </span>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
        {friends.map((friend) => (
          <FriendCard key={friend.url} friend={friend} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-5 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800/30">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {pick(friendsPage.applyTitle)}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {pick(friendsPage.applyBody)}
          </p>
        </div>

        <a
          href={emailHref}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
        >
          <LuMail className="size-4" aria-hidden="true" />
          {pick(friendsPage.applyCta)}
        </a>
      </div>
    </PageLayout>
  )
}
