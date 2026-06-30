import type { Metadata } from 'next';
import Link from 'next/link';
import { MECHANICS, MECHANIC_KEYS } from '@/data/game/mechanics';
import { getStrategyCountsByMechanic } from '@/features/strategy/queries';
import { cssVars } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mechanics · ExileStrats',
};

export const dynamic = 'force-dynamic';

export default async function MechanicsIndexPage() {
  const counts = await getStrategyCountsByMechanic();
  return (
    <div className="pt-12">
      <section className="mb-8 flex flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">Atlas · Mechanics</span>
        <h1 className="font-display text-[clamp(34px,5vw,50px)] font-bold leading-[1.02] text-fg">
          Mechanics
        </h1>
        <p className="m-0 max-w-[33.75rem] text-base leading-[1.6] text-fg-2">
          Pick a mechanic to see how it works and the strategies built around it.
        </p>
      </section>

      <div className="flex flex-col gap-2.5">
        {MECHANIC_KEYS.map((key) => {
          const m = MECHANICS[key];
          const count = counts[key] ?? 0;
          return (
            <Link
              key={key}
              href={`/mechanics/${key}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-card border border-l-[0.1875rem] border-line border-l-[var(--mech)] bg-surface p-4.5 no-underline transition-transform hover:-translate-y-[2px]"
              style={cssVars({ '--mech': m.color })}
            >
              {/* mechanic node dot */}
              <span
                className="h-[11px] w-[11px] shrink-0 rounded-full [box-shadow:0_0_10px_-1px_var(--mech)]"
                style={{ background: m.color }}
                aria-hidden="true"
              />
              {/* name */}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl font-bold leading-tight text-fg">
                  {m.name}
                </span>
              </span>
              {/* strategy count */}
              <span className="font-mono text-xs text-fg-3">
                {count} {count === 1 ? 'strategy' : 'strategies'}
              </span>
              {/* chevron */}
              <span className="ml-2 text-lg text-fg-3 transition-colors group-hover:text-brass">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
