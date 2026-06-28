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
        className="mb-[22px] flex items-center gap-2 text-[13px] text-fg-3"
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
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-[18px]">
          {/* 64px mechanic pastille */}
          <div
            className="mech-tint flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px]"
            style={cssVars({ '--mech': mechanic.color })}
          >
            <span
              className="h-[22px] w-[22px] rounded-full shadow-[inset_0_0_0_2px_rgba(255,255,255,.25),inset_0_4px_7px_rgba(255,255,255,.3)]"
              style={{ background: mechanic.color }}
            />
          </div>

          <div>
            <h1 className="font-display text-[46px] font-bold leading-none tracking-[-0.01em] text-fg">
              {mechanic.name}
            </h1>
            {/* Tags */}
            <div className="mt-[10px] flex flex-wrap gap-[7px]">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-pill border border-border bg-subtle px-[11px] py-[4px] text-xs font-semibold leading-none text-fg-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-[680px] text-base leading-[1.6] text-fg-2">{content.intro}</p>
      </header>

      {/* 2-column layout: main + sidebar */}
      <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-[22px]">
          {/* How it works */}
          <section className="glass-card glass-premium rounded-panel p-6">
            <h2 className="mb-[18px] font-display text-2xl font-semibold text-fg">How it works</h2>
            <div className="flex flex-col gap-4">
              {content.howItWorks.map((step, i) => (
                <div key={step.title} className="flex gap-[14px]">
                  <span
                    className="mech-tint flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full font-display text-base font-bold"
                    style={cssVars({ '--mech': mechanic.color })}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-fg">{step.title}</div>
                    <div className="mt-[3px] text-[14px] leading-[1.55] text-fg-2">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strategies grid */}
          <section>
            <div className="mb-[14px] flex items-baseline justify-between gap-[10px]">
              <h2 className="font-display text-2xl font-semibold text-fg">
                {mechanic.name} strategies
              </h2>
              <Link
                href="/"
                className="text-[13px] font-semibold no-underline"
                style={{ color: mechanic.color }}
              >
                View all →
              </Link>
            </div>

            {strategies.length > 0 ? (
              <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                {strategies.map((s) => (
                  <StrategyCard key={s.id} strategy={s} />
                ))}
              </div>
            ) : (
              <div className="glass-panel glass-premium flex flex-col items-center gap-3 rounded-panel py-12 text-center">
                <p className="text-[15px] text-fg-2">No strategies yet for {mechanic.name}.</p>
                <Button href="/">Browse all strategies</Button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-[18px]">
          {/* In brief */}
          <div className="glass-card glass-premium rounded-panel p-5">
            <h3 className="mb-[14px] font-display text-[17px] font-semibold text-fg">In brief</h3>
            <div className="flex flex-col">
              {content.inBrief.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-[10px] border-t border-border py-[10px]"
                >
                  <span className="text-[13px] text-fg-2">{fact.label}</span>
                  {/* Neutral colour for return — never green (anti-hype, Principe IX). */}
                  <span className="text-right text-[13px] font-semibold text-fg">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended scarabs */}
          <div className="glass-card glass-premium rounded-panel p-5">
            <h3 className="mb-[14px] font-display text-[17px] font-semibold text-fg">
              Recommended scarabs
            </h3>
            <div className="flex flex-col gap-[11px]">
              {content.scarabs.map((scarab) => (
                <div key={scarab.name} className="flex items-center gap-[11px]">
                  <span
                    className="h-5 w-5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.14),inset_0_3px_5px_rgba(255,255,255,.22)]"
                    style={{ background: mechanic.color }}
                  />
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-fg">{scarab.name}</div>
                    <div className="text-[12px] leading-[1.4] text-fg-3">{scarab.effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key atlas passives */}
          <div className="glass-card glass-premium rounded-panel p-5">
            <h3 className="mb-[14px] font-display text-[17px] font-semibold text-fg">
              Key atlas passives
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.keyPassives.map((passive) => (
                <span
                  key={passive}
                  className="rounded-tile border border-border bg-subtle px-3 py-[7px] text-[13px] font-semibold text-fg"
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
