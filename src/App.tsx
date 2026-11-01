import { useEffect, useRef } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
// import { CodeforcesCard } from './components/CodeforcesCard'
// import { Colophon } from './components/Colophon'
import { Copyright } from './components/Copyright'
import { FriendsPage } from './components/FriendsPage'
import { Games } from './components/Games'
import { Gear } from './components/Gear'
import { PageLayout } from './components/PageLayout'
import { Profile } from './components/Profile'
import { Section } from './components/Section'
import { Socials } from './components/Socials'
import { Timeline } from './components/Timeline'
import { sections } from './content'
import {
  detectLang,
  isLang,
  langFromQuery,
  LanguageProvider,
  langPath,
  useI18n,
} from './lib/i18n'
import { usePageMeta } from './lib/seo'

function AboutPage() {
  const { lang, pick } = useI18n()

  usePageMeta(
    lang === 'zh' ? '关于本站' : 'About',
    lang === 'zh'
      ? '关于 ReiAC：兴趣、设备、游戏与站点历程。'
      : 'About ReiAC: interests, gear, games and the history of this site.',
  )

  return (
    <PageLayout>
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
    </PageLayout>
  )
}

function LanguageFallback() {
  const location = useLocation()
  const [, firstSegment] = location.pathname.split('/')
  const lang = isLang(firstSegment)
    ? firstSegment
    : (langFromQuery(location.search) ?? detectLang())

  const search = new URLSearchParams(location.search)
  search.delete('lang')
  const query = search.toString()

  return (
    <Navigate
      to={{
        pathname: langPath(lang),
        search: query ? `?${query}` : '',
        hash: location.hash,
      }}
      replace
    />
  )
}

type PageKind = 'about' | 'friends'

function LanguageRoute({ page }: { page: PageKind }) {
  const { lang: langParam } = useParams()
  const location = useLocation()

  if (!isLang(langParam)) {
    return <LanguageFallback />
  }

  // Keep the canonical URL free of a trailing slash and render the right page.
  const expected =
    page === 'about' ? langPath(langParam) : `${langPath(langParam)}/friends`

  if (location.pathname !== expected) {
    return (
      <Navigate
        to={{ pathname: expected, search: location.search, hash: location.hash }}
        replace
      />
    )
  }

  return (
    <LanguageProvider lang={langParam}>
      {page === 'about' ? <AboutPage /> : <FriendsPage />}
    </LanguageProvider>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const previous = previousPath.current
    previousPath.current = pathname

    if (window.location.hash) {
      return
    }

    const previousSegments = previous.split('/')
    const nextSegments = pathname.split('/')
    const languageOnlyChange =
      isLang(previousSegments[1]) &&
      isLang(nextSegments[1]) &&
      previousSegments.slice(2).join('/') === nextSegments.slice(2).join('/')

    if (!languageOnlyChange) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/:lang" element={<LanguageRoute page="about" />} />
        <Route path="/:lang/friends" element={<LanguageRoute page="friends" />} />
        <Route path="*" element={<LanguageFallback />} />
      </Routes>
    </BrowserRouter>
  )
}
