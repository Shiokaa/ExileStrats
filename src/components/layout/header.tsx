import Link from 'next/link';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { getCurrentUser } from '@/lib/supabase/server';

const NAV_LINKS = [
  { href: '/', label: 'Strategies' },
  { href: '/mechanics', label: 'Mechanics' },
];

export async function Header() {
  const user = await getCurrentUser();
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
        <Link href="/create" className="btn btn-primary gap-[6px]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="hidden sm:inline">Create</span>
        </Link>
        <ThemeToggle />
        {user ? (
          <>
            <Link href="/profile" className="icon-btn" aria-label="Profile">
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
                <circle cx="12" cy="8" r="4" />
                <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
              </svg>
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="btn btn-ghost">
                Logout
              </button>
            </form>
          </>
        ) : (
          <Link href="/auth" className="btn btn-ghost">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
