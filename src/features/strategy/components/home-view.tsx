'use client';

import { useMemo, useState } from 'react';
import { StrategyCard } from './strategy-card';
import { Constellation } from './constellation';
import { MECHANICS, type MechanicKey } from '@/data/game/mechanics';
import { LEAGUES, type League } from '@/data/game/leagues';
import type { StrategySummary } from '@/features/strategy/types';
import { cx } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const PAGE_SIZE = 6;

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
    'cursor-pointer rounded-[0.4375rem] px-3.25 py-1.5 text-[0.78125rem] font-semibold transition-colors',
    active ? 'bg-surface-2 text-fg' : 'text-fg-2 hover:text-fg',
  );

export function HomeView({ strategies }: { strategies: StrategySummary[] }) {
  const [query, setQuery] = useState('');
  const [mechanic, setMechanic] = useState<MechanicFilter>('all');
  const [league, setLeague] = useState<LeagueFilter>('all');
  const [sort, setSort] = useState<Sort>('return');
  const [page, setPage] = useState(1);

  // Any filter/search/sort change sends the user back to the first page.
  const changeQuery = (v: string) => {
    setQuery(v);
    setPage(1);
  };
  const changeMechanic = (v: MechanicFilter) => {
    setMechanic(v);
    setPage(1);
  };
  const changeLeague = (v: LeagueFilter) => {
    setLeague(v);
    setPage(1);
  };
  const changeSort = (v: Sort) => {
    setSort(v);
    setPage(1);
  };

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

  // Clamp the page during render (no effect, no setState-in-effect).
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setMechanic('all');
    setLeague('all');
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6.5">
      {/* Hero */}
      <section className="flex flex-col items-center pb-2 pt-8 sm:pt-14 text-center">
        <span className="eyebrow">Strategies · {LEAGUES[0]} league</span>
        <h1 className="mt-3 text-[clamp(36px,5vw,54px)] font-bold leading-[1.02] text-fg">
          Path of Exile mapping strategies
        </h1>
        <p className="mt-2.5 max-w-[32.5rem] text-[0.9375rem] leading-[1.6] text-fg-2">
          Compose a juicing strategy into a clean, scannable fiche — and share it.
        </p>

        {/* Signature atlas element — also serves as the mechanic filter */}
        <Constellation active={mechanic} onSelect={changeMechanic} />

        {/* Search */}
        <div className="mt-8 flex h-11 w-full max-w-[35rem] items-center gap-3 rounded-pill border border-line bg-surface px-5 text-fg-3">
          <svg
            width="16"
            height="16"
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
            onChange={(e) => changeQuery(e.target.value)}
            placeholder="Search by title, mechanic or author…"
            className="flex-1 border-none bg-transparent text-sm text-fg outline-none placeholder:text-fg-3"
            aria-label="Search strategies"
          />
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col items-start justify-between gap-3 border-b border-line-soft pb-3.5 sm:flex-row sm:items-center">
        <span className="font-display text-[0.8125rem] font-semibold uppercase tracking-[0.0625rem] text-fg-2">
          <b className="text-fg">{results.length}</b>{' '}
          {results.length === 1 ? 'strategy' : 'strategies'}
        </span>
        <div className="flex flex-wrap gap-2.5">
          <div
            className="inline-flex gap-0.5 rounded-[0.625rem] border border-line bg-void-2 p-0.75"
            role="group"
            aria-label="League"
          >
            <button
              type="button"
              className={segment(league === 'all')}
              onClick={() => changeLeague('all')}
            >
              All
            </button>
            {LEAGUES.map((l) => (
              <button
                key={l}
                type="button"
                className={segment(league === l)}
                onClick={() => changeLeague(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div
            className="inline-flex gap-0.5 rounded-[0.625rem] border border-line bg-void-2 p-0.75"
            role="group"
            aria-label="Sort by"
          >
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                className={segment(sort === s.key)}
                onClick={() => changeSort(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card list / empty state */}
      {pageItems.length > 0 ? (
        <>
          <div className="flex flex-col gap-3.5">
            {pageItems.map((s) => (
              <StrategyCard key={s.id} strategy={s} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 pt-2" aria-label="Pagination">
              <button
                type="button"
                className={cx(
                  'rounded-pill border border-line px-3.5 py-1.75 text-[0.8125rem] font-semibold transition-colors',
                  safePage === 1
                    ? 'cursor-not-allowed text-fg-3'
                    : 'cursor-pointer text-fg-2 hover:bg-surface-2 hover:text-fg',
                )}
                onClick={() => setPage(safePage - 1)}
                disabled={safePage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={cx(
                    'min-w-9 cursor-pointer rounded-pill px-3 py-1.75 text-[0.8125rem] font-semibold transition-colors',
                    p === safePage
                      ? 'border border-line bg-surface-2 text-fg'
                      : 'text-fg-2 hover:bg-surface-2 hover:text-fg',
                  )}
                  onClick={() => setPage(p)}
                  aria-current={p === safePage ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                className={cx(
                  'rounded-pill border border-line px-3.5 py-1.75 text-[0.8125rem] font-semibold transition-colors',
                  safePage === totalPages
                    ? 'cursor-not-allowed text-fg-3'
                    : 'cursor-pointer text-fg-2 hover:bg-surface-2 hover:text-fg',
                )}
                onClick={() => setPage(safePage + 1)}
                disabled={safePage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-3.5 py-14 text-fg-2">
          <p>No strategy matches your filters.</p>
          <Button type="button" onClick={reset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
