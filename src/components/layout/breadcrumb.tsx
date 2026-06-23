import Link from 'next/link';
import { Fragment } from 'react';

export type Crumb = { label: string; href?: string };

/** Breadcrumb nav — items with `href` render as links; the last (no href) is the current page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      className="mb-[18px] flex items-center gap-[6px] text-[13px] text-fg-3"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-fg-3 no-underline transition-colors hover:text-fg-2"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-fg-2" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
