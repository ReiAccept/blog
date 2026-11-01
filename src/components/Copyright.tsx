import { copyright } from '../content'
import { useI18n } from '../lib/i18n'
import { RichText } from './RichText'

export function Copyright() {
  const { pick } = useI18n()

  return (
    <div className="card p-5">
      <ul className="space-y-2.5">
        {copyright.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
            />
            <span className="min-w-0">
              <RichText text={pick(item.text)} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
