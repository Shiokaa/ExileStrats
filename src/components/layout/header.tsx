import Link from 'next/link';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

const NAV_LINKS = [
  { href: '/', label: 'Strategies' },
  { href: '/mechanics', label: 'Mechanics' },
];

export function Header() {
  return (
    <header className="glass-nav sticky top-[14px] z-20 mt-[14px] grid grid-cols-[1fr_auto] items-center rounded-pill py-[9px] pl-[14px] pr-3 md:grid-cols-[1fr_auto_1fr]">
      <Logo />

      <nav className="hidden items-center gap-1 justify-self-center md:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-pill px-[14px] py-2 text-[13.5px] font-semibold text-fg-2 no-underline transition-colors hover:bg-subtle hover:text-fg"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-[10px] justify-self-end">
        <ThemeToggle />
        <button type="button" className="btn btn-ghost">
          Sign in
        </button>
      </div>
    </header>
  );
}
