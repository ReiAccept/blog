import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx('mt-8 scroll-mt-24', className)}
    >
      <h2
        id={headingId}
        className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
