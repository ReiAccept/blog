import { timeline } from '../content'
import { useI18n } from '../lib/i18n'

export function Timeline() {
  const { pick } = useI18n()

  return (
    <ol className="relative ml-[5px] border-l border-slate-200 pl-5 dark:border-slate-700/80">
      {timeline.map((item) => (
        <li key={item.date} className="relative pb-5 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-[5px] -left-[25.5px] size-2.5 rounded-full border-2 border-white bg-sky-500 shadow-[0_0_0_3px_rgba(14,165,233,0.12)] dark:border-slate-900"
          />
          <time className="font-mono text-[11px] tracking-wide text-slate-400 dark:text-slate-500">
            {item.date}
          </time>
          <p className="mt-1 text-sm leading-snug font-medium text-slate-700 dark:text-slate-300">
            {pick(item.title)}
          </p>
          {item.note ? (
            <p className="mt-1 text-xs leading-relaxed text-slate-400 italic dark:text-slate-500">
              {pick(item.note)}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
