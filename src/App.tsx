import { useEffect } from 'react'
// import { CodeforcesCard } from './components/CodeforcesCard'
// import { Colophon } from './components/Colophon'
import { Copyright } from './components/Copyright'
import { Footer } from './components/Footer'
import { Games } from './components/Games'
import { Gear } from './components/Gear'
import { NavBar } from './components/NavBar'
import { Profile } from './components/Profile'
import { Section } from './components/Section'
import { Socials } from './components/Socials'
import { Timeline } from './components/Timeline'
import { sections, site, ui } from './content'
import { LanguageProvider, useI18n } from './lib/i18n'

function AboutPage() {
  const { lang, pick } = useI18n()

  useEffect(() => {
    const title = lang === 'zh' ? '关于本站' : 'About'
    const description =
      lang === 'zh'
        ? '关于 ReiAC：兴趣、设备、游戏与站点历程。'
        : 'About ReiAC: interests, gear, games and the history of this site.'

    document.title = `${title} - ${site.title}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', `${title} - ${site.title}`)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', `${title} - ${site.title}`)
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description)
  }, [lang])

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
          <article className="rounded-[88px] bg-white/95 p-6 backdrop-blur-[2px] md:rounded-[144px] md:p-12 dark:bg-slate-900/80">
            <Profile />

            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="min-w-0 flex-none lg:w-[70%]">
                {/* <Section id="codeforces" title={pick(sections.codeforces)}>
                  <CodeforcesCard />
                </Section> */}
                <Section id="socials" title={pick(sections.socials)}>
                  <Socials />
                </Section>
                <Section id="gear" title={pick(sections.gear)}>
                  <Gear />
                </Section>
                <Section id="games" title={pick(sections.games)}>
                  <Games />
                </Section>
                <Section id="copyright" title={pick(sections.copyright)}>
                  <Copyright />
                </Section>
              </div>

              <div
                aria-hidden="true"
                className="mx-6 hidden w-px shrink-0 self-stretch bg-slate-200/80 lg:block dark:bg-slate-700/60"
              />

              <aside className="mt-10 min-w-0 border-t border-slate-200/70 pt-8 lg:mt-0 lg:w-[25%] lg:flex-none lg:border-t-0 lg:pt-0 dark:border-slate-700/60">
                <Section id="timeline" title={pick(sections.timeline)}>
                  <Timeline />
                </Section>
                {/* <Section id="colophon" title={pick(sections.colophon)}>
                  <Colophon />
                </Section> */}
              </aside>
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AboutPage />
    </LanguageProvider>
  )
}
