import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Lang, Localized } from '../content'

const LANG_STORAGE_KEY = 'rei-about-lang'

export function isLang(value: unknown): value is Lang {
  return value === 'zh' || value === 'en'
}

/** Read the legacy `?lang=` parameter so old links can be redirected. */
export function langFromQuery(search: string): Lang | null {
  const value = new URLSearchParams(search).get('lang')
  return isLang(value) ? value : null
}

export function detectLang(): Lang {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(stored)) {
      return stored
    }
  } catch {
    // Ignore unavailable storage.
  }

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh' : 'en'
}

export function langPath(lang: Lang): string {
  return `/${lang}`
}

/** Swap the language segment while keeping the current page. */
export function localizePath(pathname: string, lang: Lang): string {
  const segments = pathname.split('/')

  if (isLang(segments[1])) {
    segments[1] = lang
    return segments.join('/') || langPath(lang)
  }

  return pathname === '/' ? langPath(lang) : `${langPath(lang)}${pathname}`
}

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  pick: <T>(value: Localized<T>) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'

    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    } catch {
      // Ignore unavailable storage.
    }
  }, [lang])

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) {
        return
      }

      navigate({
        pathname: localizePath(location.pathname, next),
        search: location.search,
        hash: location.hash,
      })
    },
    [lang, location.hash, location.pathname, location.search, navigate],
  )

  const toggleLang = useCallback(() => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }, [lang, setLang])

  const pick = useCallback(
    <T,>(value: Localized<T>): T => value[lang],
    [lang],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang, pick }),
    [lang, setLang, toggleLang, pick],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useI18n must be used inside <LanguageProvider>')
  }
  return context
}
