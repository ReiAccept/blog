import { LuMoon, LuSun } from 'react-icons/lu'
import { ui } from '../content'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'
import { useTheme } from '../lib/theme'

export function ThemeToggle({ solid }: { solid: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const { pick } = useI18n()
  const label = theme === 'dark' ? pick(ui.themeToLight) : pick(ui.themeToDark)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex size-8 items-center justify-center rounded-full ring-1 transition-colors duration-200',
        solid
          ? 'bg-slate-100 text-slate-500 ring-slate-200/80 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700 dark:hover:text-white'
          : 'bg-slate-950/35 text-white ring-white/25 backdrop-blur-md hover:bg-slate-950/50',
      )}
    >
      {theme === 'dark' ? (
        <LuSun className="size-4" aria-hidden="true" />
      ) : (
        <LuMoon className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
