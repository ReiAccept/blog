import { hero, intro, site } from '../content'
import { useI18n } from '../lib/i18n'
import { RichText } from './RichText'

export function Profile() {
  const { pick } = useI18n()

  return (
    <>
      <header className="flex flex-row items-center gap-4 sm:gap-8">
        <img
          src={site.avatar}
          alt={pick(hero.avatarAlt)}
          width={192}
          height={192}
          className="size-32 shrink-0 rounded-full object-cover ring-4 ring-white/70 md:size-48 dark:ring-slate-800"
        />
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            {hero.name}
          </h1>
          <p className="mt-2 text-xl font-normal text-slate-500 md:text-2xl dark:text-slate-400">
            {hero.handle}
          </p>
          <p className="mt-1 text-sm font-medium text-sky-600 md:text-base dark:text-sky-400">
            {pick(hero.role)}
          </p>
        </div>
        <div className="grow" />
      </header>

      <ul className="mt-6 space-y-2 text-[16px] leading-[1.65] text-slate-600 dark:text-slate-300">
        {intro.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.68em] size-1.5 shrink-0 rounded-full bg-sky-400/80 dark:bg-sky-500/80"
            />
            <span className="min-w-0">
              <RichText text={pick(item)} />
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
