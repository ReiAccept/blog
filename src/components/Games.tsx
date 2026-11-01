import { games } from '../content'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'
import { CopyButton } from './CopyButton'
import { gameIcons, gameToneClasses } from './icons'

export function Games() {
  const { pick } = useI18n()

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {games.map((game) => {
        const Icon = gameIcons[game.icon]

        return (
          <div key={game.id} className="card flex h-full flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-medium text-slate-900 dark:text-slate-100">
                  {pick(game.name)}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {pick(game.meta)}
                </p>
              </div>
              <div
                className={cx(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl ring-1',
                  gameToneClasses[game.tone],
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-auto pt-4">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                {pick(game.accountLabel)}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <code className="min-w-0 flex-1 truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                  {game.account}
                </code>
                <CopyButton value={game.account} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
