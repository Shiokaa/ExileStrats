import type { CSSProperties, ReactNode } from 'react';
import styles from './fiche.module.css';
import { DIFFICULTY, MECHANICS, TIERS } from '@/lib/mechanics';
import { buildDiscordSummary } from '@/lib/discord';
import type { Difficulty, MechanicKey, Scarab, StrategyFiche } from '@/lib/types';
import { CopyForDiscord } from '@/components/copy-for-discord';

const cssVars = (vars: Record<string, string>): CSSProperties => vars as CSSProperties;

function MechanicTag({ mechanic }: { mechanic: MechanicKey }) {
  const m = MECHANICS[mechanic];
  return (
    <span className={styles.tag} style={cssVars({ '--mech': m.color })}>
      <span className={styles.tagDot} />
      {m.name}
    </span>
  );
}

function DifficultyMeter({ level }: { level: Difficulty }) {
  return (
    <span className={styles.diff} style={cssVars({ '--diff-c': `var(--diff-${level})` })}>
      <span className={styles.diffBars}>
        {[1, 2, 3].map((i) => (
          <span key={i} className={styles.diffBar} data-on={i <= level} />
        ))}
      </span>
      <span className={styles.diffLabel}>{DIFFICULTY[level].label}</span>
    </span>
  );
}

function Tile({
  label,
  tone = 'default',
  children,
}: {
  label: string;
  tone?: 'default' | 'muted';
  children: ReactNode;
}) {
  return (
    <div className={styles.tile}>
      <span className={styles.tileLabel}>{label}</span>
      <span className={styles.tileValue} data-tone={tone}>
        {children}
      </span>
    </div>
  );
}

function MapDevice({ scarabs, color }: { scarabs: Scarab[]; color: string }) {
  const slots = Array.from({ length: 5 }, (_, i) => scarabs[i] ?? null);
  return (
    <div className={styles.scarabGrid}>
      {slots.map((scarab, i) => (
        <div
          key={scarab ? scarab.id : `empty-${i}`}
          className={styles.scarabSlot}
          data-filled={scarab !== null}
          style={cssVars({ '--mech': color })}
        >
          {scarab ? (
            <span className={styles.scarabName}>{scarab.name}</span>
          ) : (
            <span className={styles.scarabEmpty} />
          )}
        </div>
      ))}
    </div>
  );
}

export function Fiche({ strategy }: { strategy: StrategyFiche }) {
  const mechanic = MECHANICS[strategy.mechanic];
  const discord = buildDiscordSummary(strategy);

  return (
    <article className={styles.fiche} style={cssVars({ '--mech': mechanic.color })}>
      <span className={styles.accent} aria-hidden="true" />
      <div className={styles.body}>
        {/* 1 — Header + actions */}
        <header className={styles.header}>
          <div className={styles.tagRow}>
            {strategy.mechanicTags.map((mk) => (
              <MechanicTag key={mk} mechanic={mk} />
            ))}
            <span className={styles.league}>{strategy.league}</span>
            {strategy.tier && (
              <span
                className={styles.tier}
                style={cssVars({ '--tier': TIERS[strategy.tier].color })}
              >
                {strategy.tier} · {TIERS[strategy.tier].note}
              </span>
            )}
            <span className={styles.updated}>updated {strategy.updatedDaysAgo}d ago</span>
          </div>
          <h1 className={styles.title}>{strategy.title}</h1>
          <p className={styles.byline}>
            by {strategy.author} · {strategy.mapDevice.scarabs.length} scarabs
          </p>
          <div className={styles.actions}>
            <CopyForDiscord text={discord} className="btn btn--primary" />
            {strategy.media?.youtube && (
              <a
                className="btn btn--yt"
                href={strategy.media.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Watch on YouTube
              </a>
            )}
          </div>
        </header>

        {/* 2 — TL;DR */}
        <section className={styles.tldr}>
          <Tile label="What you farm">{strategy.summary.farms}</Tile>
          <Tile label="Invest / map" tone="muted">
            {strategy.summary.investPerMap}
          </Tile>
          <Tile label={`Est. return · ${strategy.summary.snapshotLeague}`}>
            {strategy.summary.profitPerHour}
          </Tile>
          <Tile label="Difficulty">
            <DifficultyMeter level={strategy.difficulty} />
          </Tile>
        </section>

        {/* 3 — Map device (signature visual) */}
        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>Map device</h2>
          <MapDevice scarabs={strategy.mapDevice.scarabs} color={mechanic.color} />
          {strategy.mapDevice.extras && strategy.mapDevice.extras.length > 0 && (
            <div className={styles.chips}>
              {strategy.mapDevice.extras.map((extra) => (
                <span key={extra} className={styles.chip}>
                  {extra}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* 4 — Detail: atlas tree, then how to play */}
        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>Atlas tree</h2>
          <div className={styles.atlas}>
            {strategy.atlasTree.kind === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={strategy.atlasTree.url} alt="Atlas tree" className={styles.atlasImg} />
            ) : (
              <a
                className="btn btn--ghost"
                href={strategy.atlasTree.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open atlas planner ↗
              </a>
            )}
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>How to play</h2>
          <ol className={styles.steps}>
            {strategy.steps.map((step, i) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 5 — Secondary */}
        <section className={styles.secondary}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>Recommended maps</h2>
            <div className={styles.chips}>
              {strategy.maps.names.map((name) => (
                <span key={name} className={styles.chip}>
                  {name}
                </span>
              ))}
            </div>
            {strategy.maps.note && <p className={styles.note}>{strategy.maps.note}</p>}
          </div>
          {strategy.notes && (
            <div className={styles.panel}>
              <h2 className={styles.sectionTitle}>Notes</h2>
              <p className={styles.note}>{strategy.notes}</p>
            </div>
          )}
        </section>

        {/* 6 — Footer: GGG compliance */}
        <footer className={styles.ficheFooter}>
          This product isn&apos;t affiliated with or endorsed by Grinding Gear Games in any way.
        </footer>
      </div>
    </article>
  );
}
