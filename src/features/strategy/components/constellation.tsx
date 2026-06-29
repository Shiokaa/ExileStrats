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
    <div className="relative mx-auto mt-8 max-w-4xl px-2 pt-6">
      {/* connecting line, centred on the node discs (hairline) */}
      <span
        aria-hidden="true"
        className="absolute inset-x-[7%] top-12 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,var(--brass-dim)_10%,var(--brass-dim)_90%,transparent)] opacity-90"
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
                'group flex flex-1 cursor-pointer flex-col items-center gap-2 whitespace-nowrap border-0 bg-transparent px-1 font-display text-xs font-semibold uppercase tracking-wider transition-colors',
                on ? 'text-fg' : 'text-fg-3 hover:text-fg',
              )}
            >
              <span
                className={cx(
                  'flex size-12 items-center justify-center rounded-full border-2 border-[var(--mc)] bg-void-2 transition-transform',
                  on ? '' : 'group-hover:scale-110',
                )}
                style={on ? { boxShadow: '0 0 16px -2px var(--mc)' } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.icon}
                  alt=""
                  className={cx(
                    'size-8 object-contain transition-opacity',
                    on ? 'opacity-100' : 'opacity-75 group-hover:opacity-100',
                  )}
                />
              </span>
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
