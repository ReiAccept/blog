import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Lang, Localized } from '../content'

const LANG_STORAGE_KEY = 'rei-about-lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  pick: <T>(value: Localized<T>) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (fromQuery === 'zh' || fromQuery === 'en') {
    return fromQuery
  }

  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  if (stored === 'zh' || stored === 'en') {
    return stored
  }

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh' : 'en'
}

function syncUrl(lang: Lang) {
  const url = new URL(window.location.href)
  if (url.searchParams.get('lang') === lang) {
    return
  }
  url.searchParams.set('lang', lang)
  window.history.replaceState(window.history.state, '', url)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    syncUrl(lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'zh' ? 'en' : 'zh'))
  }, [])

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
