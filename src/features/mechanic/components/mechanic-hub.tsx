import Link from 'next/link';
import { MECHANICS, type MechanicKey } from '@/data/game/mechanics';
import { StrategyCard } from '@/features/strategy/components/strategy-card';
import type { StrategySummary } from '@/features/strategy/types';
import { getMechanicContent } from '@/features/mechanic/content';
import { cssVars } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MechanicHubProps {
  mechanicKey: MechanicKey;
  strategies: StrategySummary[];
}

export function MechanicHub({ mechanicKey, strategies }: MechanicHubProps) {
  const mechanic = MECHANICS[mechanicKey];
  const content = getMechanicContent(mechanicKey);

  return (
    <div className="pt-6">
      {/* Breadcrumb */}
      <nav
        className="mb-5.5 flex items-center gap-2 text-[0.8125rem] text-fg-3"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-fg-2 no-underline hover:text-fg">
          Strategies
        </Link>
        <span>/</span>
        <span className="text-fg" aria-current="page">
          {mechanic.name}
        </span>
      </nav>

      {/* Hero */}
      <header className="mb-5 sm:mb-8">
        <div className="flex flex-wrap items-center gap-4.5">
          {/* 64px mechanic pastille */}
          <div
            className="mech-tint flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.125rem] border border-[var(--mech)]"
            style={cssVars({ '--mech': mechanic.color })}
          >
            <span className="h-5.5 w-5.5 rounded-full" style={{ background: mechanic.color }} />
          </div>

          <div>
            <h1 className="font-display text-[2.875rem] font-bold leading-none tracking-[-0.01em] text-fg">
              {mechanic.name}
            </h1>
            {/* Tags */}
            <div className="mt-2.5 flex flex-wrap gap-1.75">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-pill border border-line bg-surface-2 px-2.75 py-1 text-xs font-semibold leading-none text-fg-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-[42.5rem] text-base leading-[1.6] text-fg-2">{content.intro}</p>
      </header>

      {/* 2-column layout: main + sidebar */}
      <div className="grid grid-cols-1 items-start gap-5.5 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-5.5">
          {/* How it works */}
          <section className="glass-card rounded-panel p-6">
            <h2 className="eyebrow mb-4.5">How it works</h2>
            <div className="flex flex-col gap-4">
              {content.howItWorks.map((step, i) => (
                <div key={step.title} className="flex gap-3.5">
                  <span
                    className="font-mono flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border border-[var(--mech)] text-[var(--mech)] text-base font-bold"
                    style={cssVars({ '--mech': mechanic.color })}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[0.9375rem] font-semibold text-fg">{step.title}</div>
                    <div className="mt-0.75 text-sm leading-[1.55] text-fg-2">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strategies grid */}
          <section>
            <div className="mb-3.5 flex items-baseline justify-between gap-2.5">
              <h2 className="font-display text-2xl font-semibold text-fg">
                {mechanic.name} strategies
              </h2>
              <Link
                href="/"
                className="text-[0.8125rem] font-semibold no-underline"
                style={{ color: mechanic.color }}
              >
                View all →
              </Link>
            </div>

            {strategies.length > 0 ? (
              <div className="flex flex-col gap-3.5">
                {strategies.map((s) => (
                  <StrategyCard key={s.id} strategy={s} />
                ))}
              </div>
            ) : (
              <div className="glass-panel flex flex-col items-center gap-3 rounded-panel py-12 text-center">
                <p className="text-[0.9375rem] text-fg-2">No strategies yet for {mechanic.name}.</p>
                <Button href="/">Browse all strategies</Button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4.5">
          {/* In brief */}
          <div className="glass-card rounded-panel p-5">
            <h3 className="eyebrow mb-3.5">In brief</h3>
            <div className="flex flex-col">
              {content.inBrief.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-2.5 border-t border-line py-2.5"
                >
                  <span className="text-[0.8125rem] text-fg-2">{fact.label}</span>
                  {/* Neutral colour for return — never green (anti-hype, Principe IX). */}
                  <span className="text-right font-mono text-[0.8125rem] font-semibold text-fg">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended scarabs */}
          <div className="glass-card rounded-panel p-5">
            <h3 className="eyebrow mb-3.5">Recommended scarabs</h3>
            <div className="flex flex-col gap-2.75">
              {content.scarabs.map((scarab) => (
                <div key={scarab.name} className="flex items-center gap-2.75">
                  <span
                    className="h-5 w-5 shrink-0 rounded-full"
                    style={{ background: mechanic.color }}
                  />
                  <div className="min-w-0">
                    <div className="text-[0.8125rem] font-semibold text-fg">{scarab.name}</div>
                    <div className="text-xs leading-[1.4] text-fg-3">{scarab.effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key atlas passives */}
          <div className="glass-card rounded-panel p-5">
            <h3 className="eyebrow mb-3.5">Key atlas passives</h3>
            <div className="flex flex-wrap gap-2">
              {content.keyPassives.map((passive) => (
                <span
                  key={passive}
                  className="rounded-tile border border-line bg-surface-2 px-3 py-1.75 text-[0.8125rem] font-semibold text-fg"
                >
                  {passive}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
