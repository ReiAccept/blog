import { LuArrowUp } from 'react-icons/lu'
import { SiReact, SiTypescript, SiVite } from 'react-icons/si'
import { footer, ui } from '../content'
import { useI18n } from '../lib/i18n'

export function Footer() {
  const { pick } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 min-h-48 px-6 py-12 text-center">
      <div className="mx-auto max-w-[1200px]">
        <code className="text-sm text-slate-500 dark:text-slate-400">{footer.compiler}</code>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          &copy; {footer.copyrightName} &nbsp;{year}
        </p>

        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
          <span>{pick(footer.designInspired)}</span>
          <a
            href="https://github.com/ReiAccept/blog/tree/about"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            ReiAccept/blog
          </a>
          <span aria-hidden="true">·</span>
          <span>{pick(footer.builtWith)}</span>
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex items-center gap-1"
          >
            <SiReact className="hidden size-3 text-sky-500 sm:block" aria-hidden="true" />
            React
          </a>
          <span aria-hidden="true">+</span>
          <a
            href="https://vite.dev/"
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex items-center gap-1"
          >
            <SiVite className="hidden size-3 text-violet-500 sm:block" aria-hidden="true" />
            Vite
          </a>
          <span aria-hidden="true">+</span>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex items-center gap-1"
          >
            <SiTypescript className="hidden size-3 text-blue-600 sm:block" aria-hidden="true" />
            TypeScript
          </a>
        </p>

        <a
          href="#top"
          className="mt-4 inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-400"
        >
          <LuArrowUp className="size-3.5" aria-hidden="true" />
          {pick(ui.backToTop)}
        </a>
      </div>
    </footer>
  )
}
