import { socials, ui } from '../content'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'
import { socialIcons } from './icons'

export function Socials() {
  const { pick } = useI18n()

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
      {socials.map((social) => {
        const { Icon, className } = socialIcons[social.id]
        const external = social.href.startsWith('http')

        return (
          <a
            key={social.id}
            href={social.href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            aria-label={`${pick(social.name)} — ${social.handle}${external ? ` (${pick(ui.externalLink)})` : ''}`}
            className="card group flex h-full flex-col gap-3 p-4 sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <div className="flex items-center sm:col-span-1 sm:justify-center">
              <Icon
                className={cx(
                  'size-8 transition-transform duration-200 group-hover:scale-110 sm:size-10',
                  className,
                )}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0 sm:col-span-2 sm:self-center">
              <h3 className="truncate text-base font-medium text-slate-900 sm:text-lg dark:text-slate-100">
                {pick(social.name)}
              </h3>
              <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                {social.handle}
              </span>
            </div>
          </a>
        )
      })}
    </div>
  )
}
