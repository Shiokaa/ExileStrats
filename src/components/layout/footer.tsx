import Link from 'next/link';
import { Logo } from './logo';
import { NAV_LINKS } from './nav-links';

export function Footer() {
  return (
    <footer className="glass-nav mt-12 mb-6 rounded-panel px-6 py-5.5">
      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <Logo markSize={18} />
        <nav className="flex flex-wrap gap-1.5" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-pill px-3 py-1.5 text-[0.8125rem] font-semibold text-fg-2 no-underline hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-4 border-t border-border pt-4 text-[0.71875rem] text-fg-3">
        This product isn&apos;t affiliated with or endorsed by Grinding Gear Games in any way.
      </p>
    </footer>
  );
}
