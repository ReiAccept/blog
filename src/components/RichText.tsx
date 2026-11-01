import type { ReactNode } from 'react'

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g

type RichTextProps = {
  text: string
}

export function RichText({ text }: RichTextProps) {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0
    if (index > cursor) {
      nodes.push(text.slice(cursor, index))
    }

    const label = match[1]
    const href = match[2]
    const external = href.startsWith('http')

    nodes.push(
      <a
        key={`${href}-${index}`}
        href={href}
        className="link"
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {label}
      </a>,
    )

    cursor = index + match[0].length
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return <>{nodes}</>
}
