import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './strategy-card.module.css';
import { MECHANICS } from '@/data/game/mechanics';
import { DIFFICULTY } from '@/features/strategy/labels';
import type { StrategySummary } from '@/features/strategy/types';
import { formatInvest, formatReturn, formatUpdated } from '@/lib/utils';

const cssVars = (vars: Record<string, string>): CSSProperties => vars as CSSProperties;

export function StrategyCard({ strategy }: { strategy: StrategySummary }) {
  const mechanic = MECHANICS[strategy.mechanic];

  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      className={styles.card}
      style={cssVars({ '--mech': mechanic.color })}
    >
      <span className={styles.accent} aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.tag}>
            <span className={styles.tagDot} />
            {mechanic.name}
          </span>
          <span className={styles.updated}>{formatUpdated(strategy.updatedDaysAgo)}</span>
        </div>

        <div>
          <h3 className={styles.title}>{strategy.title}</h3>
          <p className={styles.byline}>
            by {strategy.author} · {strategy.league} · {strategy.scarabCount} scarabs
          </p>
        </div>

        <div className={styles.diffRow}>
          <span className={styles.diffLabelMuted}>Difficulty</span>
          <span
            className={styles.diff}
            style={cssVars({ '--diff-c': `var(--diff-${strategy.difficulty})` })}
          >
            <span className={styles.diffBars}>
              {[1, 2, 3].map((i) => (
                <span key={i} className={styles.diffBar} data-on={i <= strategy.difficulty} />
              ))}
            </span>
            <span className={styles.diffLabel}>{DIFFICULTY[strategy.difficulty]}</span>
          </span>
        </div>

        <div className={styles.footer}>
          <div>
            <span className={styles.footLabel}>Est. return</span>
            {/* Neutral colour — never green (anti-hype, Principe IX). */}
            <span className={styles.footValue}>{formatReturn(strategy.returnPerHour)}</span>
          </div>
          <div className={styles.footRight}>
            <span className={styles.footLabel}>Invest / map</span>
            <span className={styles.footValueMuted}>{formatInvest(strategy.investPerMap)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
