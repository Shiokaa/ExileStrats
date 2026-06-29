'use client';

import { MECHANIC_KEYS, MECHANICS, type MechanicKey } from '@/data/game/mechanics';
import { cssVars, cx } from '@/lib/utils';

type Selection = MechanicKey | 'all';

/**
 * Signature element: the Atlas constellation. The mechanic filter rendered as
 * connected nodes (the Atlas-of-Worlds metaphor), doubling as navigation.
 * Clicking the active node again clears back to "all".
 */
export function Constellation({
  active,
  onSelect,
}: {
  active: Selection;
  onSelect: (next: Selection) => void;
}) {
  return (
    <div className="relative mx-auto mt-[34px] max-w-[920px] px-2 pt-[22px]">
      {/* connecting line behind the nodes */}
      <span
        aria-hidden="true"
        className="absolute inset-x-[5%] top-[31px] h-px bg-[linear-gradient(90deg,transparent,var(--brass-dim)_12%,var(--brass-dim)_88%,transparent)] opacity-60"
      />
      <div className="relative flex items-start justify-between">
        {MECHANIC_KEYS.map((key) => {
          const m = MECHANICS[key];
          const on = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(on ? 'all' : key)}
              aria-pressed={on}
              style={cssVars({ '--mc': m.color })}
              className={cx(
                'group flex flex-1 cursor-pointer flex-col items-center gap-[9px] border-0 bg-transparent font-display text-xs font-semibold uppercase tracking-[1px] transition-colors',
                on ? 'text-fg' : 'text-fg-3 hover:text-fg',
              )}
            >
              <span
                className={cx(
                  'h-[18px] w-[18px] rounded-full border-2 border-[var(--mc)] transition-transform',
                  on ? 'bg-[var(--mc)]' : 'bg-page group-hover:scale-110',
                )}
                style={{
                  boxShadow: on
                    ? '0 0 0 4px var(--void), 0 0 14px -2px var(--mc)'
                    : '0 0 0 4px var(--void)',
                }}
              />
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
