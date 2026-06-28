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
      <section className="mb-8 flex flex-col items-center gap-[14px] text-center">
        <h1 className="text-[clamp(34px,5vw,50px)] font-bold leading-[1.02] text-fg">Mechanics</h1>
        <p className="m-0 max-w-[540px] text-base leading-[1.6] text-fg-2">
          Pick a mechanic to see how it works and the strategies built around it.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {MECHANIC_KEYS.map((key) => {
          const m = MECHANICS[key];
          const count = counts[key] ?? 0;
          return (
            <Link
              key={key}
              href={`/mechanics/${key}`}
              className="glass-card glass-premium relative flex items-center gap-[14px] overflow-hidden rounded-card p-[18px] no-underline transition-transform hover:-translate-y-[3px]"
              style={cssVars({ '--mech': m.color })}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-[var(--mech)]" aria-hidden="true" />
              <span
                className="h-[42px] w-[42px] shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.14),inset_0_6px_10px_rgba(255,255,255,.2)]"
                style={{ background: m.color }}
              />
              <span className="min-w-0">
                <span className="block font-display text-[20px] font-semibold leading-tight text-fg">
                  {m.name}
                </span>
                <span className="mt-0.5 block text-[12px] text-fg-3">
                  {count} {count === 1 ? 'strategy' : 'strategies'}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
