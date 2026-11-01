import { gear } from '../content'
import { useI18n } from '../lib/i18n'
import { gearIcons } from './icons'

export function Gear() {
  const { pick } = useI18n()

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {gear.map((group) => {
        const Icon = gearIcons[group.icon]

        return (
          <div key={group.id} className="card flex h-full flex-col p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Icon className="size-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              {pick(group.name)}
            </h3>
            <div className="mt-3 flex flex-1 flex-wrap content-start gap-2">
              {group.badges.map((badge) => (
                <img
                  key={badge.src}
                  src={badge.src}
                  alt={badge.alt}
                  height={28}
                  loading="lazy"
                  className="h-7 w-auto rounded-[3px] ring-1 ring-slate-200/80 dark:ring-slate-700/80"
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
