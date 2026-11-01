import { Link, useLocation } from 'react-router-dom'
import type { Lang } from '../content'
import { ui } from '../content'
import { cx } from '../lib/cx'
import { localizePath, useI18n } from '../lib/i18n'

const languageOptions: Array<{ value: Lang; label: string; htmlLang: string }> = [
  { value: 'zh', label: '中', htmlLang: 'zh-CN' },
  { value: 'en', label: 'EN', htmlLang: 'en' },
]

export function LanguageToggle({ solid }: { solid: boolean }) {
  const { lang, pick } = useI18n()
  const location = useLocation()

  return (
    <div
      role="group"
      aria-label={pick(ui.language)}
      className={cx(
        'inline-flex items-center gap-0.5 rounded-full p-0.5 text-[11px] font-semibold ring-1 transition-colors duration-300',
        solid
          ? 'bg-slate-100 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700'
          : 'bg-slate-950/35 ring-white/25 backdrop-blur-md',
      )}
    >
      {languageOptions.map((option) => {
        const active = option.value === lang
        const actionLabel =
          option.value === 'zh' ? pick(ui.switchToChinese) : pick(ui.switchToEnglish)

        return (
          <Link
            key={option.value}
            to={{
              pathname: localizePath(location.pathname, option.value),
              search: location.search,
              hash: location.hash,
            }}
            lang={option.htmlLang}
            aria-label={active ? option.label : actionLabel}
            aria-current={active ? 'page' : undefined}
            title={actionLabel}
            onClick={(event) => {
              if (active) {
                event.preventDefault()
              }
            }}
            className={cx(
              'rounded-full px-2 py-1 leading-none transition-colors duration-200',
              active
                ? solid
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'bg-white text-slate-900 shadow-sm'
                : solid
                  ? 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  : 'text-white/75 hover:text-white',
            )}
          >
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}
