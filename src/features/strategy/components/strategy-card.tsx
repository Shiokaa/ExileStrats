import Link from 'next/link';
import { MECHANICS, type MechanicKey } from '@/data/game/mechanics';
import { DIFFICULTY } from '@/features/strategy/labels';
import type { StrategySummary } from '@/features/strategy/types';
import { cssVars, formatInvest, formatReturn, formatUpdated } from '@/lib/utils';

// Mechanics that ship a background photo in /public/poe1_cards_background.
// Add a key here when its <mechanic>.jpeg is added — cards then get the photo treatment.
const MECHANIC_PHOTOS = new Set<MechanicKey>(['harvest']);

export function StrategyCard({ strategy }: { strategy: StrategySummary }) {
  const mechanic = MECHANICS[strategy.mechanic];
  const hasPhoto = MECHANIC_PHOTOS.has(strategy.mechanic);

  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      data-photo-card={hasPhoto || undefined}
      className="relative flex flex-col overflow-hidden rounded-card no-underline transition-transform hover:-translate-y-[3px]"
      style={cssVars({ '--mech': mechanic.color })}
    >
      {/* Mechanic photo, behind the glass — only when an image exists for this mechanic. */}
      {hasPhoto && (
        <span
          aria-hidden="true"
          data-card-photo
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/poe1_cards_background/${strategy.mechanic}.jpeg)` }}
        />
      )}
      {/* Glass sheet (over the photo when present). */}
      <div className="glass-card glass-premium flex flex-col gap-[13px] p-[18px]">
        <span
          data-mech-bar
          className="absolute inset-x-0 top-0 h-1 bg-[var(--mech)]"
          aria-hidden="true"
        />
        <div className="flex items-center justify-between">
          <span className="mech-tint inline-flex items-center gap-[7px] rounded-pill px-[11px] py-[5px] text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mech)]" />
            {mechanic.name}
          </span>
          <span className="text-[11px] text-fg-3">{formatUpdated(strategy.updatedDaysAgo)}</span>
        </div>

        <div>
          <h3 className="text-[21px] font-semibold leading-[1.1] text-fg">{strategy.title}</h3>
          <p className="mt-1 text-xs text-fg-3">
            by {strategy.author} · {strategy.league} · {strategy.scarabCount} scarabs
          </p>
        </div>

        <div
          className="flex items-center justify-between"
          style={cssVars({ '--diff-c': `var(--diff-${strategy.difficulty})` })}
        >
          <span className="text-[11px] text-fg-3">Difficulty</span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex gap-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-[5px] w-5 rounded-[3px]"
                  style={{
                    background: i <= strategy.difficulty ? 'var(--diff-c)' : 'var(--subtle-border)',
                  }}
                />
              ))}
            </span>
            <span className="text-xs font-semibold text-[var(--diff-c)]">
              {DIFFICULTY[strategy.difficulty]}
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-border pt-[13px]">
          <div>
            <span className="block text-[11px] text-fg-3">Est. return</span>
            {/* Neutral colour — never green (anti-hype, Principe IX). */}
            <span className="mt-1 block font-display text-[18px] font-semibold text-fg">
              {formatReturn(strategy.returnPerHour)}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-fg-3">Invest / map</span>
            <span className="mt-1 block font-display text-[18px] font-semibold text-fg-2">
              {formatInvest(strategy.investPerMap)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
