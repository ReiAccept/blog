import { LuArrowUpRight } from 'react-icons/lu'
import { services, ui } from '../content'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'
import { serviceIcons, serviceToneClasses } from './icons'

/** Links to the services this site runs, shown above the timeline. */
export function Services() {
  const { pick } = useI18n()

  return (
    <div className="grid grid-cols-1 gap-3">
      {services.map((service) => {
        const Icon = serviceIcons[service.icon]

        return (
          <a
            key={service.id}
            href={service.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${pick(service.name)} — ${service.meta} (${pick(ui.externalLink)})`}
            className="card group flex items-start gap-3 p-4"
          >
            <span
              aria-hidden="true"
              className={cx(
                'flex size-9 shrink-0 items-center justify-center rounded-xl ring-1',
                serviceToneClasses[service.tone],
              )}
            >
              <Icon className="size-4.5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-sm leading-snug font-semibold text-slate-900 dark:text-slate-100">
                {pick(service.name)}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">
                {service.meta}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {pick(service.description)}
              </span>
            </span>

            <LuArrowUpRight
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-slate-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-slate-600 dark:group-hover:text-sky-400"
            />
          </a>
        )
      })}
    </div>
  )
}
