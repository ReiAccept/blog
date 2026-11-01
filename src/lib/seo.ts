import { useEffect } from 'react'
import { site } from '../content'

/** Keep the document title and social metadata in sync with the active page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} - ${site.title}`
    document.title = fullTitle

    const setMeta = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', description)
  }, [title, description])
}
