import Link from 'next/link';
import { MECHANICS } from '@/data/game/mechanics';
import { DIFFICULTY } from '@/features/strategy/labels';
import { buildDiscordSummary } from '@/features/strategy/discord';
import type { StrategyDetail, StrategySummary } from '@/features/strategy/types';
import { cssVars, formatInvest, formatReturn, formatUpdated } from '@/lib/utils';
import { CopyForDiscord } from './copy-for-discord';
import { YoutubeEmbed } from './youtube-embed';
import { StrategyCard } from './strategy-card';
import { OwnerActions } from './owner-actions';
import { AuthorAvatar } from './author-avatar';
import { Button } from '@/components/ui/button';

const TOC = [
  { n: '01', label: 'TL;DR', href: '#tldr' },
  { n: '02', label: 'Map device', href: '#map-device' },
  { n: '03', label: 'Atlas tree', href: '#atlas' },
  { n: '04', label: 'How to play', href: '#how-to-play' },
  { n: '05', label: 'Maps & notes', href: '#maps' },
];

const sectionTitle = 'eyebrow';

export function Fiche({
  detail,
  similar,
  isOwner,
  slug,
}: {
  detail: StrategyDetail;
  similar: StrategySummary[];
  isOwner: boolean;
  slug: string;
}) {
  const { summary, content } = detail;
  const mechanic = MECHANICS[summary.mechanic];
  const discord = buildDiscordSummary(detail);

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
        <span className="text-fg-2">{mechanic.name}</span>
        <span>/</span>
        <span className="text-fg">{summary.title}</span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-[30px] lg:grid-cols-[230px_1fr]">
        {/* Sidebar */}
        <aside className="sticky top-[84px] hidden flex-col gap-[22px] lg:flex">
          <div>
            <div className="eyebrow mb-[10px] px-1">On this page</div>
            <div className="flex flex-col gap-0.5">
              {TOC.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-[11px] rounded-[9px] px-[10px] py-2 text-[14px] font-medium text-fg-2 no-underline hover:bg-subtle hover:text-fg"
                >
                  <span className="w-[18px] shrink-0 font-mono text-[12px] font-semibold text-brass">
                    {item.n}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-tile p-4">
            <div className="flex items-center gap-2">
              <span className="h-[7px] w-[7px] rounded-full bg-brass" />
              <span className="font-display text-[15px] font-semibold text-fg">Active league</span>
            </div>
            <div className="mt-[7px] text-[13px] text-fg-2">
              {summary.league} · {formatUpdated(summary.updatedDaysAgo)}
            </div>
          </div>
        </aside>

        {/* Main column */}
        <main className="flex min-w-0 flex-col gap-[30px]">
          <article className="glass-card relative overflow-hidden rounded-[22px]">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-[18px] p-[24px_26px_18px]">
              <div className="min-w-0">
                <h1 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.01em] text-fg">
                  {summary.title}
                </h1>
                <div className="mt-1.5 flex items-center gap-2 text-[13px] text-fg-2">
                  <AuthorAvatar name={summary.author} src={summary.authorAvatar} size={22} />
                  <span>by {summary.author}</span>
                </div>
                <div className="mt-[13px] flex flex-wrap items-center gap-2">
                  {summary.mechanicTags.map((mk) => (
                    <span
                      key={mk}
                      className="mech-tint inline-flex items-center rounded-pill px-[11px] py-[5px] text-xs font-semibold leading-none"
                      style={cssVars({ '--mech': MECHANICS[mk].color })}
                    >
                      {MECHANICS[mk].name}
                    </span>
                  ))}
                  <span className="inline-flex items-center rounded-pill border border-line bg-surface-2 px-[11px] py-[5px] text-xs font-medium leading-none text-fg-2">
                    {summary.league} league
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-3">
                <CopyForDiscord text={discord} />
                {isOwner && <OwnerActions slug={slug} redirectTo="/profile" />}
                {content.media?.youtube && <YoutubeEmbed url={content.media.youtube} />}
              </div>
            </div>

            <div className="h-px bg-line" />

            {/* Body */}
            <div className="flex flex-col gap-6 p-[22px_26px_26px]">
              {/* 1 — TL;DR */}
              <section id="tldr" className="scroll-mt-[100px]">
                <h2 className="eyebrow mb-[10px]">TL;DR</h2>
                <div className="flex flex-col gap-3">
                  {/* What you farm — full-width headline, tinted with the main mechanic */}
                  <div
                    className="mech-tint rounded-[13px] p-[15px_18px]"
                    style={cssVars({ '--mech': mechanic.color })}
                  >
                    <div className="text-xs font-semibold opacity-80">What you farm</div>
                    <div className="mt-1.5 font-display text-[22px] font-semibold leading-[1.1]">
                      {content.summary.farms}
                    </div>
                  </div>
                  {/* 3 equal metrics */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="glass-panel rounded-[13px] p-[15px_16px]">
                      <div className="text-xs font-medium text-fg-3">Invest / map</div>
                      <div className="mt-[7px] font-mono text-[24px] font-semibold leading-none text-fg">
                        {formatInvest(summary.investPerMap)}
                      </div>
                    </div>
                    {/* Neutral colour — never green (anti-hype, Principe IX). */}
                    <div className="glass-panel rounded-[13px] p-[15px_16px]">
                      <div className="text-xs font-medium text-fg-3">Est. return</div>
                      <div className="mt-[7px] font-mono text-[24px] font-semibold leading-none text-fg">
                        {formatReturn(summary.returnPerHour)}
                      </div>
                    </div>
                    <div
                      className="glass-panel rounded-[13px] p-[15px_16px]"
                      style={cssVars({ '--diff-c': `var(--diff-${summary.difficulty})` })}
                    >
                      <div className="text-xs font-medium text-fg-3">Difficulty</div>
                      <div className="mt-[11px] flex items-center gap-1">
                        {[1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className="h-1.5 w-[22px] rounded-[3px]"
                            style={{
                              background: i <= summary.difficulty ? 'var(--diff-c)' : 'var(--line)',
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-[9px] font-display text-[16px] font-semibold leading-none text-[var(--diff-c)]">
                        {DIFFICULTY[summary.difficulty]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-fg-3">
                  snapshot {content.summary.snapshotLeague}
                </div>
              </section>

              {/* 2 — Map device */}
              <section id="map-device" className="scroll-mt-[100px]">
                <h2 className="eyebrow mb-[10px]">Map device</h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {content.mapDevice.scarabs.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2">
                      <div className="glass-panel flex aspect-square w-full items-center justify-center rounded-[13px]">
                        <span
                          className="h-11 w-11 rounded-full"
                          style={{
                            background: MECHANICS[s.mechanic].color,
                            boxShadow: `0 0 14px -2px ${MECHANICS[s.mechanic].color}`,
                          }}
                        />
                      </div>
                      <span className="text-center text-[11px] leading-tight text-fg-2">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
                {content.mapDevice.extras && content.mapDevice.extras.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.mapDevice.extras.map((extra) => (
                      <span
                        key={extra}
                        className="rounded-pill border border-line bg-surface-2 px-3 py-1.5 text-[12.5px] font-semibold text-fg-2"
                      >
                        {extra}
                      </span>
                    ))}
                  </div>
                )}
              </section>

              {/* 3 — Atlas tree */}
              <section id="atlas" className="glass-panel scroll-mt-[100px] rounded-[15px] p-[18px]">
                <h2 className={`${sectionTitle} mb-3`}>Atlas tree</h2>
                {content.atlasTree.kind === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={content.atlasTree.url} alt="Atlas tree" className="w-full rounded-xl" />
                ) : (
                  <Button href={content.atlasTree.url} target="_blank" rel="noopener noreferrer">
                    Open atlas planner ↗
                  </Button>
                )}
              </section>

              {/* 4 — How to play */}
              <section
                id="how-to-play"
                className="glass-panel scroll-mt-[100px] rounded-[15px] p-[18px]"
              >
                <h2 className={`${sectionTitle} mb-[14px]`}>How to play</h2>
                <ol className="flex flex-col gap-3">
                  {content.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 font-mono text-[13px] font-semibold text-fg-3">
                        {i + 1}
                      </span>
                      <span className="text-[14px] leading-[1.5] text-fg">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 5 — Maps & notes */}
              <section
                id="maps"
                className="grid scroll-mt-[100px] grid-cols-1 gap-[18px] sm:grid-cols-2"
              >
                <div>
                  <h2 className="eyebrow mb-[10px]">Recommended maps</h2>
                  <div className="flex flex-wrap gap-2">
                    {content.maps.names.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-pill border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-fg"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  {content.maps.note && (
                    <p className="mt-3 text-[13px] leading-[1.55] text-fg-2">{content.maps.note}</p>
                  )}
                </div>
                {content.notes && (
                  <div>
                    <h2 className="eyebrow mb-[10px]">Notes</h2>
                    <p className="text-[14px] leading-[1.55] text-fg-2">{content.notes}</p>
                  </div>
                )}
              </section>
            </div>
          </article>

          {/* Similar strategies */}
          {similar.length > 0 && (
            <section>
              <h2 className="eyebrow mb-[14px]">Similar strategies</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((s) => (
                  <StrategyCard key={s.id} strategy={s} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
