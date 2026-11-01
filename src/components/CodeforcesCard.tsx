import { useEffect, useId, useMemo, useState } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import { SiCodeforces } from 'react-icons/si'
import { codeforces } from '../content'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'

type CfInfo = {
  rating: number
  maxRating: number
  rank: string
}

type CfInfoResponse = {
  status: string
  result?: Array<{
    rating?: number
    maxRating?: number
    rank?: string
  }>
}

type CfRatingResponse = {
  status: string
  result?: Array<{
    newRating: number
  }>
}

type FetchState = 'loading' | 'live' | 'fallback'

const CHART_WIDTH = 600
const CHART_HEIGHT = 64

const rankStyles: Record<string, string> = {
  newbie:
    'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600',
  pupil:
    'bg-emerald-50 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  specialist:
    'bg-cyan-50 text-cyan-700 ring-cyan-500/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:ring-cyan-400/20',
  expert:
    'bg-blue-50 text-blue-700 ring-blue-500/20 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20',
  'candidate master':
    'bg-violet-50 text-violet-700 ring-violet-500/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20',
  master:
    'bg-amber-50 text-amber-700 ring-amber-500/25 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  'international master':
    'bg-orange-50 text-orange-700 ring-orange-500/25 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/20',
  grandmaster:
    'bg-rose-50 text-rose-700 ring-rose-500/25 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
  'international grandmaster':
    'bg-red-50 text-red-700 ring-red-500/25 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/20',
  'legendary grandmaster':
    'bg-red-100 text-red-800 ring-red-500/30 dark:bg-red-400/15 dark:text-red-200 dark:ring-red-400/30',
}

function formatRank(rank: string): string {
  return rank
    .split(' ')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ')
}

function buildChart(values: number[]) {
  if (values.length < 2) {
    return null
  }

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const top = 6
  const bottom = CHART_HEIGHT - 6
  const left = 4
  const right = CHART_WIDTH - 4

  const points = values.map((value, index) => {
    const x = left + (index / (values.length - 1)) * (right - left)
    const y = bottom - ((value - min) / range) * (bottom - top)
    return [x, y] as const
  })

  const line = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ')

  const last = points[points.length - 1]

  return {
    area: `${line} L${right} ${CHART_HEIGHT} L${left} ${CHART_HEIGHT} Z`,
    line,
    lastX: last[0],
    lastY: last[1],
    min,
    max,
  }
}

export function CodeforcesCard() {
  const { pick } = useI18n()
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const [info, setInfo] = useState<CfInfo | null>(null)
  const [history, setHistory] = useState<number[]>([])
  const [fetchState, setFetchState] = useState<FetchState>('loading')
  const [badgeSrc, setBadgeSrc] = useState(
    'https://api.cubercsl.site/api/codeforces?user=ReiAC&style=for-the-badge',
  )

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const [infoResponse, ratingResponse] = await Promise.all([
          fetch('https://codeforces.com/api/user.info?handles=ReiAC', {
            signal: controller.signal,
          }).then((response) => response.json() as Promise<CfInfoResponse>),
          fetch('https://codeforces.com/api/user.rating?handle=ReiAC', {
            signal: controller.signal,
          })
            .then((response) => response.json() as Promise<CfRatingResponse>)
            .catch(() => null),
        ])

        const user = infoResponse.status === 'OK' ? infoResponse.result?.[0] : undefined
        if (controller.signal.aborted) {
          return
        }

        if (user?.rating != null) {
          setInfo({
            rating: user.rating,
            maxRating: user.maxRating ?? user.rating,
            rank: user.rank ?? 'unrated',
          })
          setHistory(
            (ratingResponse?.result ?? [])
              .map((contest) => contest.newRating)
              .filter(Number.isFinite)
              .slice(-40),
          )
          setFetchState('live')
        } else {
          setFetchState('fallback')
        }
      } catch {
        if (!controller.signal.aborted) {
          setFetchState('fallback')
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [])

  const rating = info?.rating ?? codeforces.fallback.rating
  const maxRating = info?.maxRating ?? codeforces.fallback.maxRating
  const rank = info?.rank ?? codeforces.fallback.rank
  const rankLabel = formatRank(rank)
  const chart = useMemo(() => buildChart(history), [history])
  const statusLabel =
    fetchState === 'live'
      ? pick(codeforces.labels.live)
      : fetchState === 'loading'
        ? pick(codeforces.labels.syncing)
        : pick(codeforces.labels.snapshot)

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/15 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20">
            <SiCodeforces className="size-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              {pick(codeforces.kicker)}
            </p>
            <h3 className="truncate text-xl font-semibold text-slate-900 dark:text-white">
              {codeforces.handle}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={cx(
                  'rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ring-1',
                  rankStyles[rank.toLowerCase()] ?? rankStyles.newbie,
                )}
              >
                {rankLabel}
              </span>
              <span
                className={cx(
                  'inline-flex items-center gap-1 text-[10px] font-medium',
                  fetchState === 'live'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : fetchState === 'loading'
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-400 dark:text-slate-500',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'size-1.5 rounded-full',
                    fetchState === 'live'
                      ? 'bg-emerald-500'
                      : fetchState === 'loading'
                        ? 'animate-pulse bg-sky-400'
                        : 'bg-slate-400',
                  )}
                />
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="grow" />

        <div className="flex items-end gap-6">
          <div>
            <p className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
              {rating}
            </p>
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              {pick(codeforces.labels.rating)}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700 tabular-nums dark:text-slate-200">
              {maxRating}
            </p>
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              {pick(codeforces.labels.peak)}
            </p>
          </div>
        </div>
      </div>

      {chart ? (
        <figure className="mt-5">
          <figcaption className="mb-1 flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              {pick(codeforces.labels.history)}
            </span>
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
              {chart.min} → {chart.max}
            </span>
          </figcaption>
          <svg
            role="img"
            aria-label={pick(codeforces.labels.chart)}
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="h-auto w-full text-sky-500 dark:text-sky-400"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1={CHART_HEIGHT - 1}
              x2={CHART_WIDTH}
              y2={CHART_HEIGHT - 1}
              stroke="currentColor"
              strokeOpacity="0.12"
              vectorEffect="non-scaling-stroke"
            />
            <path d={chart.area} fill={`url(#${gradientId})`} />
            <path
              d={chart.line}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={chart.lastX} cy={chart.lastY} r="3" fill="currentColor" />
          </svg>
        </figure>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <a
          href={codeforces.profileUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={pick(codeforces.labels.view)}
          className="inline-flex rounded"
        >
          <img
            src={badgeSrc}
            alt={`Codeforces: ${codeforces.handle}, ${rankLabel} ${rating}`}
            width={193}
            height={28}
            loading="lazy"
            className="h-7 w-auto rounded-[3px] ring-1 ring-slate-200/80 dark:ring-slate-700/80"
            onError={() => setBadgeSrc('./assets/badges/codeforces.svg')}
          />
        </a>
        <a
          href={codeforces.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="link inline-flex items-center gap-1 text-sm font-medium"
        >
          {pick(codeforces.labels.view)}
          <LuArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
