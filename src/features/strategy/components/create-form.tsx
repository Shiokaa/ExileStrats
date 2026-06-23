'use client';

import { useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { MECHANICS, MECHANIC_KEYS, type MechanicKey } from '@/data/game/mechanics';
import { LEAGUES, type League } from '@/data/game/leagues';
import { DIFFICULTY } from '@/features/strategy/labels';
import type { Difficulty, StrategySummary } from '@/features/strategy/types';
import { createStrategyAction, updateStrategyAction } from '@/features/strategy/actions';
import { cx } from '@/lib/utils';
import { StrategyCard } from './strategy-card';

const cssVars = (vars: Record<string, string>): CSSProperties => vars as CSSProperties;

const DIFFICULTY_KEYS: Difficulty[] = [1, 2, 3];

/** Pre-filled values when editing an existing strategy (see CreateForm `initial`). */
export type CreateFormInitial = {
  title: string;
  mechanic: MechanicKey;
  league: League;
  difficulty: Difficulty;
  returnRaw: string;
  investRaw: string;
  farms: string;
  summary: string;
  steps: string[];
  scarabs: string[];
  atlasLink: string;
};

type CreateFormProps =
  | { mode?: 'create' }
  | { mode: 'edit'; slug: string; initial: CreateFormInitial };

/** Numbered section header (circle badge + title). */
function SectionHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-[18px] flex items-center gap-[10px]">
      <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] font-display text-[14px] font-bold text-accent">
        {n}
      </span>
      <h2 className="text-[22px] font-semibold text-fg">{title}</h2>
    </div>
  );
}

/** Glass-panel section wrapper. */
function Section({ children }: { children: React.ReactNode }) {
  return <section className="glass-card rounded-panel p-[24px]">{children}</section>;
}

/** Shared label style. */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-[7px] block text-[13px] font-semibold text-fg-2">{children}</label>;
}

/** Shared text/number input style. */
function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <input
      type={type}
      value={value}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[46px] w-full rounded-input border border-border bg-[var(--input-bg)] px-[15px] text-[15px] text-fg outline-none placeholder:text-fg-3"
    />
  );
}

export function CreateForm(props: CreateFormProps = { mode: 'create' }) {
  const isEdit = props.mode === 'edit';
  const initial = props.mode === 'edit' ? props.initial : undefined;

  // §1 Essentials
  const [title, setTitle] = useState(initial?.title ?? '');
  const [mechanic, setMechanic] = useState<MechanicKey>(initial?.mechanic ?? 'harvest');
  const [league, setLeague] = useState<League>(initial?.league ?? LEAGUES[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 2);

  // §2 Numbers
  const [returnRaw, setReturnRaw] = useState(initial?.returnRaw ?? '');
  const [investRaw, setInvestRaw] = useState(initial?.investRaw ?? '');

  // §3 Method
  const [farms, setFarms] = useState(initial?.farms ?? '');
  const [summary, setSummary] = useState(initial?.summary ?? '');
  const [steps, setSteps] = useState<string[]>(
    initial?.steps?.length ? initial.steps : ['', '', ''],
  );

  // §4 Map device — up to 5 scarabs (no fragments in V1)
  const [scarabs, setScarabs] = useState<string[]>(
    initial?.scarabs?.length ? initial.scarabs : ['', '', ''],
  );

  // §5 Atlas tree
  const [atlasLink, setAtlasLink] = useState(initial?.atlasLink ?? '');

  // Submit
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive preview during render — no useEffect, no setState-in-effect.
  const returnPerHour = Math.max(0, parseFloat(returnRaw) || 0);
  const investPerMap = Math.max(0, parseFloat(investRaw) || 0);
  const scarabCount = scarabs.filter((s) => s.trim()).length;

  const preview: StrategySummary = {
    id: 'preview',
    slug: 'preview',
    title: title.trim() || 'Your strategy title',
    author: 'You',
    authorAvatar: null,
    league,
    mechanic,
    mechanicTags: [mechanic],
    difficulty,
    returnPerHour,
    investPerMap,
    scarabCount,
    updatedDaysAgo: 0,
  };

  // Step handlers
  const updateStep = (index: number, value: string) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const addStep = () => {
    if (steps.length >= 8) return;
    setSteps((prev) => [...prev, '']);
  };

  // Scarab handlers (map device — max 5)
  const updateScarab = (index: number, value: string) => {
    setScarabs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const removeScarab = (index: number) => {
    setScarabs((prev) => prev.filter((_, i) => i !== index));
  };

  const addScarab = () => {
    if (scarabs.length >= 5) return;
    setScarabs((prev) => [...prev, '']);
  };

  const submit = async () => {
    setError(null);
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }
    setBusy(true);
    const input = {
      title,
      mechanic,
      league,
      difficulty,
      returnPerHour,
      investPerMap,
      farms,
      summary,
      steps,
      scarabs,
      atlasLink,
    };
    const result =
      props.mode === 'edit'
        ? await updateStrategyAction(props.slug, input)
        : await createStrategyAction(input);
    if (result.ok) {
      router.push(`/strategy/${result.slug}`);
    } else {
      setBusy(false);
      setError(result.error);
    }
  };

  const segmentActive = 'glass-card text-fg';
  const segmentInactive = 'text-fg-2';

  const segmentBtn = (active: boolean) =>
    cx(
      'flex-1 cursor-pointer rounded-pill border-none px-[6px] py-[8px] text-[13px] font-semibold transition-colors',
      active ? segmentActive : segmentInactive,
    );

  return (
    <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[1fr_360px]">
      {/* ===== LEFT: FORM ===== */}
      <div className="flex flex-col gap-[18px] min-w-0">
        {/* §1 Essentials */}
        <Section>
          <SectionHeader n={1} title="The essentials" />

          <Label>Strategy title</Label>
          <TextInput
            value={title}
            onChange={setTitle}
            placeholder="e.g. Harvest Lifeforce Juicing"
          />

          <div className="mt-[18px]">
            <Label>Main mechanic</Label>
            <div className="flex flex-wrap gap-[8px]">
              {MECHANIC_KEYS.map((key) => {
                const m = MECHANICS[key];
                const active = mechanic === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={cx(
                      'inline-flex cursor-pointer items-center gap-[8px] rounded-pill border px-[14px] py-[8px] text-[13px] font-semibold transition-colors',
                      active
                        ? 'mech-tint border-transparent'
                        : 'border-border text-fg-2 hover:bg-subtle hover:text-fg',
                    )}
                    style={cssVars({ '--mech': m.color })}
                    onClick={() => setMechanic(key)}
                  >
                    <span className="h-[9px] w-[9px] flex-shrink-0 rounded-full bg-[var(--mech)]" />
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-[18px] grid grid-cols-2 gap-[14px]">
            <div>
              <Label>League</Label>
              <div
                className="inline-flex w-full rounded-pill border border-border bg-subtle-2 p-[3px]"
                role="group"
                aria-label="League"
              >
                {LEAGUES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={segmentBtn(league === l)}
                    onClick={() => setLeague(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Difficulty</Label>
              <div
                className="inline-flex w-full rounded-pill border border-border bg-subtle-2 p-[3px]"
                role="group"
                aria-label="Difficulty"
              >
                {DIFFICULTY_KEYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={segmentBtn(difficulty === d)}
                    onClick={() => setDifficulty(d)}
                    title={DIFFICULTY[d]}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* §2 Numbers */}
        <Section>
          <SectionHeader n={2} title="Measured numbers" />

          <div className="grid grid-cols-2 gap-[14px]">
            <div>
              <Label>Est. return (div / h)</Label>
              <TextInput
                value={returnRaw}
                onChange={setReturnRaw}
                placeholder="2.4"
                inputMode="decimal"
              />
            </div>
            <div>
              <Label>Investment / map (chaos)</Label>
              <TextInput
                value={investRaw}
                onChange={setInvestRaw}
                placeholder="12"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Anti-hype note (hard requirement per Principle IX) */}
          <div className="mt-[14px] flex gap-[10px] rounded-input bg-subtle p-[12px_14px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-[1px] flex-shrink-0 text-fg-3"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="11" x2="12" y2="16.5" />
              <circle cx="12" cy="7.8" r="0.4" />
            </svg>
            <span className="text-[12.5px] leading-[1.5] text-fg-2">
              Enter numbers you actually measured over at least 20 maps. Return is an estimate
              balanced by difficulty — it is never the headline.
            </span>
          </div>
        </Section>

        {/* §3 Method */}
        <Section>
          <SectionHeader n={3} title="The method" />

          <Label>What you farm</Label>
          <TextInput
            value={farms}
            onChange={setFarms}
            placeholder="e.g. Harvest Lifeforce, Yellow crops"
          />

          <div className="mt-[18px]">
            <Label>Summary</Label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="In one or two sentences, what is the strategy and who is it for."
              className="w-full rounded-input border border-border bg-[var(--input-bg)] px-[15px] py-[13px] text-[14px] leading-[1.5] text-fg outline-none placeholder:text-fg-3 resize-y"
            />
          </div>

          <div className="mt-[18px]">
            <Label>Steps</Label>
            <div className="flex flex-col gap-[10px]">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-[10px]">
                  <span className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] font-display text-[14px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => updateStep(i, e.target.value)}
                    placeholder={`Step ${i + 1}`}
                    className="h-[44px] min-w-0 flex-1 rounded-[11px] border border-border bg-[var(--input-bg)] px-[14px] text-[14px] text-fg outline-none placeholder:text-fg-3"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      aria-label="Remove step"
                      onClick={() => removeStep(i)}
                      className="icon-btn flex-shrink-0"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {steps.length < 8 && (
              <button
                type="button"
                onClick={addStep}
                className="mt-[12px] inline-flex items-center gap-[7px] rounded-[11px] border border-dashed border-border bg-transparent px-[15px] py-[9px] text-[13px] font-semibold text-fg-2 cursor-pointer hover:text-fg"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add a step
              </button>
            )}
          </div>
        </Section>

        {/* §4 Map device — up to 5 scarabs */}
        <Section>
          <SectionHeader n={4} title="Map device" />
          <p className="mb-[16px] text-[13px] leading-[1.5] text-fg-3">
            Up to 5 scarabs. No fragments in V1.
          </p>
          <div className="flex flex-col gap-[10px]">
            {scarabs.map((scarab, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <span
                  className="h-[10px] w-[10px] flex-shrink-0 rounded-full"
                  style={{ background: MECHANICS[mechanic].color }}
                />
                <input
                  type="text"
                  value={scarab}
                  onChange={(e) => updateScarab(i, e.target.value)}
                  placeholder={`Scarab ${i + 1}`}
                  className="h-[44px] min-w-0 flex-1 rounded-[11px] border border-border bg-[var(--input-bg)] px-[14px] text-[14px] text-fg outline-none placeholder:text-fg-3"
                />
                {scarabs.length > 1 && (
                  <button
                    type="button"
                    aria-label="Remove scarab"
                    onClick={() => removeScarab(i)}
                    className="icon-btn flex-shrink-0"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          {scarabs.length < 5 && (
            <button
              type="button"
              onClick={addScarab}
              className="mt-[12px] inline-flex cursor-pointer items-center gap-[7px] rounded-[11px] border border-dashed border-border bg-transparent px-[15px] py-[9px] text-[13px] font-semibold text-fg-2 hover:text-fg"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add a scarab
            </button>
          )}
        </Section>

        {/* §5 Atlas tree — level-0: link or image URL only (no interactive editor, non-goal V1) */}
        <Section>
          <SectionHeader n={5} title="Atlas tree" />
          <p className="mb-[16px] text-[13px] leading-[1.5] text-fg-3">
            Paste a planner link (e.g. PoE planner URL) or an image URL. The interactive atlas
            editor is not available in V1.
          </p>
          <Label>Planner link or image URL</Label>
          <TextInput
            value={atlasLink}
            onChange={setAtlasLink}
            placeholder="https://poeplanner.com/… or https://i.imgur.com/…"
          />
        </Section>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-end gap-[12px]">
          {error && <p className="mr-auto text-[13px] text-[#C0392B]">{error}</p>}
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? (isEdit ? 'Saving…' : 'Publishing…') : isEdit ? 'Save changes' : 'Publish'}
          </button>
        </div>
      </div>

      {/* ===== RIGHT: LIVE PREVIEW ===== */}
      <aside className="sticky top-[92px] flex flex-col gap-[13px]">
        <div className="text-[12px] font-semibold uppercase tracking-[0.04em] text-fg-3">
          Card preview
        </div>
        <StrategyCard strategy={preview} />
        <p className="mt-[2px] text-[12px] leading-[1.5] text-fg-3">
          The preview updates as you fill in the form — this is exactly how your strategy will
          appear in listings.
        </p>
      </aside>
    </div>
  );
}
