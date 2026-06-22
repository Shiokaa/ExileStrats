'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import styles from './home-view.module.css';
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
    <div className={styles.page}>
      {/* Hero + search */}
      <section className={styles.hero}>
        <span className={styles.leagueBadge}>{LEAGUES[0]} league</span>
        <h1 className={styles.title}>Path of Exile mapping strategies</h1>
        <p className={styles.subtitle}>
          Compose a juicing strategy into a clean, scannable fiche — and share it.
        </p>
        <div className={styles.search}>
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
            className={styles.searchInput}
            aria-label="Search strategies"
          />
        </div>
      </section>

      {/* Mechanic filter rail */}
      <div className={styles.rail}>
        <button
          type="button"
          className={cx(styles.pill, mechanic === 'all' && styles.pillActive)}
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
              className={cx(styles.pill, active && styles.pillActive)}
              style={cssVars({ '--mech': m.color })}
              onClick={() => setMechanic(key)}
              data-mech-active={active}
            >
              <span className={styles.pillDot} />
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.count}>
          {results.length} {results.length === 1 ? 'strategy' : 'strategies'}
        </span>
        <div className={styles.controls}>
          <div className={styles.segmented} role="group" aria-label="League">
            <button
              type="button"
              className={cx(styles.segment, league === 'all' && styles.segmentActive)}
              onClick={() => setLeague('all')}
            >
              All
            </button>
            {LEAGUES.map((l) => (
              <button
                key={l}
                type="button"
                className={cx(styles.segment, league === l && styles.segmentActive)}
                onClick={() => setLeague(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className={styles.segmented} role="group" aria-label="Sort by">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                className={cx(styles.segment, sort === s.key && styles.segmentActive)}
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
        <div className={styles.grid}>
          {results.map((s) => (
            <StrategyCard key={s.id} strategy={s} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No strategy matches your filters.</p>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
