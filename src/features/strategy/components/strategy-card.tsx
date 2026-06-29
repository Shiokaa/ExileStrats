import Link from 'next/link';
import { MECHANICS } from '@/data/game/mechanics';
import { DIFFICULTY } from '@/features/strategy/labels';
import type { StrategySummary } from '@/features/strategy/types';
import { cssVars, formatInvest, formatReturn } from '@/lib/utils';

/**
 * Long single-column strategy card (atlas direction): mechanic image as the card
 * background + a dark scrim for legibility (no backdrop-filter), a mechanic-coloured
 * node + accent rail, title/meta on the left, mono stats + difficulty on the right.
 * Per-mechanic images live in /public/poe1_cards_background/<mechanic>.jpeg; when
 * one is missing the solid surface shows through.
 */
export function StrategyCard({ strategy }: { strategy: StrategySummary }) {
  const mechanic = MECHANICS[strategy.mechanic];

  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      style={{
        ...cssVars({ '--mech': mechanic.color, '--dc': `var(--diff-${strategy.difficulty})` }),
        backgroundImage: `url(/poe1_cards_background/${strategy.mechanic}.jpeg)`,
      }}
      className="group @container relative grid grid-cols-[auto_1fr_auto] items-center gap-[22px] overflow-hidden rounded-card border border-l-[3px] border-line border-l-[var(--mech)] bg-surface bg-cover bg-center p-5 no-underline [text-shadow:0_1px_3px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-[2px]"
    >
      {/* dark scrim over the image — keeps text readable */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(9,11,18,0.93)_0%,rgba(9,11,18,0.72)_58%,rgba(9,11,18,0.86)_100%)]"
      />

      {/* zone 1 — mechanic node identity */}
      <div className="relative z-[1] flex w-[70px] flex-col items-center gap-2">
        <span className="h-[13px] w-[13px] rounded-full bg-[var(--mech)] [box-shadow:0_0_12px_-1px_var(--mech)]" />
        <span className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-[var(--mech)]">
          {mechanic.name}
        </span>
      </div>

      {/* zone 2 — title + meta */}
      <div className="relative z-[1] min-w-0">
        <h3 className="font-display text-[23px] font-bold leading-[1.05] text-fg">
          {strategy.title}
        </h3>
        <p className="mt-1 text-[13px] text-fg-2">
          by {strategy.author} · {strategy.league} · {strategy.scarabCount} scarabs
        </p>
      </div>

      {/* zone 3 — stats (mono) + difficulty */}
      <div className="relative z-[1] flex items-center gap-[26px]">
        <div className="text-right">
          <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[1.5px] text-fg-3">
            Return
          </span>
          {/* Neutral colour — never green (anti-hype, Principe IX). */}
          <span className="font-mono text-[17px] font-semibold text-fg">
            {formatReturn(strategy.returnPerHour)}
          </span>
        </div>
        <div className="hidden text-right @md:block">
          <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[1.5px] text-fg-3">
            Invest
          </span>
          <span className="font-mono text-[17px] font-semibold text-fg-2">
            {formatInvest(strategy.investPerMap)}
          </span>
        </div>
        <div className="hidden text-right @lg:block">
          <span className="inline-flex gap-[3px]">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-[5px] w-[18px] rounded-[2px]"
                style={{ background: i <= strategy.difficulty ? 'var(--dc)' : 'var(--line)' }}
              />
            ))}
          </span>
          <span className="mt-1.5 block text-xs font-bold text-[var(--dc)]">
            {DIFFICULTY[strategy.difficulty]}
          </span>
        </div>
        <span className="text-xl text-fg-3 transition-colors group-hover:text-brass">→</span>
      </div>
    </Link>
  );
}
