import { LuArrowUpRight } from 'react-icons/lu'
import { colophon } from '../content'
import { useI18n } from '../lib/i18n'
import { RichText } from './RichText'

export function Colophon() {
  const { pick } = useI18n()

  return (
    <div className="card p-4">
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <RichText text={pick(colophon.body)} />
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {colophon.tech.map((tech) => (
          <code
            key={tech}
            className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </code>
        ))}
      </div>
      <a
        href={colophon.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600 transition-colors hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        {pick(colophon.source)}
        <LuArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  )
}
