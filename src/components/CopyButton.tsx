import { useEffect, useRef, useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'
import { ui } from '../content'
import { useI18n } from '../lib/i18n'

export function CopyButton({ value }: { value: string }) {
  const { pick } = useI18n()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand('copy')
      } catch {
        document.body.removeChild(textarea)
        return
      }

      document.body.removeChild(textarea)
    }

    setCopied(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => setCopied(false), 1600)
  }

  const label = copied ? pick(ui.copied) : `${pick(ui.copy)} ${value}`

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        title={label}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:bg-slate-800"
      >
        {copied ? (
          <LuCheck className="size-3.5 text-emerald-500" aria-hidden="true" />
        ) : (
          <LuCopy className="size-3.5" aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? pick(ui.copied) : ''}
      </span>
    </>
  )
}
