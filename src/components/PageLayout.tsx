import type { ReactNode } from 'react'
import { site, ui } from '../content'
import { useI18n } from '../lib/i18n'
import { Footer } from './Footer'
import { NavBar } from './NavBar'

type PageLayoutProps = {
  children: ReactNode
}

/** Shared cover, navigation and rounded content shell used by every page. */
export function PageLayout({ children }: PageLayoutProps) {
  const { pick } = useI18n()

  return (
    <div id="top" className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg dark:focus:bg-slate-800 dark:focus:text-white"
      >
        {pick(ui.skipToContent)}
      </a>

      <NavBar />

      <div className="relative flow-root">
        <div className="absolute inset-x-0 top-0 h-[50vh] overflow-hidden" aria-hidden="true">
          <img
            src={site.cover}
            srcSet={`${site.coverSmall} 960w, ${site.cover} 1920w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[center_65%] dark:brightness-[0.72] dark:saturate-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-transparent dark:from-slate-950/50" />
        </div>
        <div
          className="cover-fade pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
          aria-hidden="true"
        />

        <main
          id="main"
          className="relative z-10 mx-auto mt-[30vh] w-full max-w-[1200px] px-3 pb-4 sm:px-0"
        >
          <article className="rounded-[30px] bg-white/95 p-6 backdrop-blur-[2px] md:rounded-[35px] md:p-12 dark:bg-slate-900/80">
            {children}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}
