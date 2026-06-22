'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { StrategyCard } from './strategy-card';
import { MECHANICS, MECHANIC_KEYS, type MechanicKey } from '@/data/game/mechanics';
import { LEAGUES, type League } from '@/data/game/leagues';
import type { StrategySummary } from '@/features/strategy/types';
import { cx } from '@/lib/utils';

const cssVars = (vars: Record<string, string>): CSSProperties => vars as CSSProperties;

type MechanicFilter = MechanicKey | 'all';
type LeagueFilter = League | 'all';
type Sort = 'return' | 'invest' | 'recent';

const SORTS: { key: Sort; label: string }[] = [
  { key: 'return', label: 'Return' },
  { key: 'invest', label: 'Invest' },
  { key: 'recent', label: 'Recent' },
];

const segment = (active: boolean) =>
  cx(
    'cursor-pointer rounded-pill px-[14px] py-[7px] text-[13px] font-semibold transition-colors',
    active ? 'glass-card text-fg' : 'text-fg-2',
  );

export function HomeView({ strategies }: { strategies: StrategySummary[] }) {
  const [query, setQuery] = useState('');
  const [mechanic, setMechanic] = useState<MechanicFilter>('all');
  const [league, setLeague] = useState<LeagueFilter>('all');
  const [sort, setSort] = useState<Sort>('return');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = strategies.filter((s) => {
      if (mechanic !== 'all' && s.mechanic !== mechanic) return false;
      if (league !== 'all' && s.league !== league) return false;
      if (q) {
        const haystack = `${s.title} ${s.author} ${MECHANICS[s.mechanic].name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (sort === 'return') return b.returnPerHour - a.returnPerHour;
      if (sort === 'invest') return a.investPerMap - b.investPerMap;
      return a.updatedDaysAgo - b.updatedDaysAgo;
    });
  }, [strategies, query, mechanic, league, sort]);

  const reset = () => {
    setQuery('');
    setMechanic('all');
    setLeague('all');
  };

  return (
    <div className="flex flex-col gap-[26px]">
      {/* Hero + search */}
      <section className="flex flex-col items-center gap-[14px] pt-12 pb-2 text-center">
        <span className="rounded-pill bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-[14px] py-1.5 text-xs font-semibold text-accent">
          {LEAGUES[0]} league
        </span>
        <h1 className="text-[clamp(34px,5vw,50px)] font-bold leading-[1.02] text-fg">
          Path of Exile mapping strategies
        </h1>
        <p className="m-0 max-w-[540px] text-base leading-[1.6] text-fg-2">
          Compose a juicing strategy into a clean, scannable fiche — and share it.
        </p>
        <div className="glass-card mt-2 flex h-14 w-full max-w-[560px] items-center gap-3 rounded-pill px-5 text-fg-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, mechanic or author…"
            className="flex-1 border-none bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-3"
            aria-label="Search strategies"
          />
        </div>
      </section>

      {/* Mechanic filter rail */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={cx(
            'cursor-pointer rounded-pill border border-border px-[15px] py-2 text-[13px] font-semibold transition-colors hover:bg-subtle hover:text-fg',
            mechanic === 'all' ? 'border-transparent bg-subtle text-fg' : 'text-fg-2',
          )}
          onClick={() => setMechanic('all')}
        >
          All
        </button>
        {MECHANIC_KEYS.map((key) => {
          const m = MECHANICS[key];
          const active = mechanic === key;
          return (
            <button
              key={key}
              type="button"
              className={cx(
                'inline-flex cursor-pointer items-center gap-2 rounded-pill border px-[15px] py-2 text-[13px] font-semibold transition-colors',
                active
                  ? 'mech-tint border-transparent'
                  : 'border-border text-fg-2 hover:bg-subtle hover:text-fg',
              )}
              style={cssVars({ '--mech': m.color })}
              onClick={() => setMechanic(key)}
            >
              <span className="h-[9px] w-[9px] rounded-full bg-[var(--mech)]" />
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <span className="text-[13px] font-semibold text-fg-2">
          {results.length} {results.length === 1 ? 'strategy' : 'strategies'}
        </span>
        <div className="flex flex-wrap gap-[10px]">
          <div
            className="inline-flex rounded-pill border border-border bg-subtle-2 p-[3px]"
            role="group"
            aria-label="League"
          >
            <button
              type="button"
              className={segment(league === 'all')}
              onClick={() => setLeague('all')}
            >
              All
            </button>
            {LEAGUES.map((l) => (
              <button
                key={l}
                type="button"
                className={segment(league === l)}
                onClick={() => setLeague(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div
            className="inline-flex rounded-pill border border-border bg-subtle-2 p-[3px]"
            role="group"
            aria-label="Sort by"
          >
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                className={segment(sort === s.key)}
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid / empty state */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <StrategyCard key={s.id} strategy={s} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[14px] py-14 text-fg-2">
          <p>No strategy matches your filters.</p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
