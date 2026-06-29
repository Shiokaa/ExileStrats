import Link from 'next/link';
import { Logo } from './logo';
import { getCurrentUser } from '@/lib/supabase/server';
import { NAV_LINKS } from './nav-links';
import { UserIcon } from '@/components/ui/icons';
import { Button, IconButton } from '@/components/ui/button';

export async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="glass-nav sticky top-3.5 z-20 mt-3.5 grid grid-cols-[1fr_auto] items-center rounded-pill py-2.25 pl-3.5 pr-3 md:grid-cols-[1fr_auto_1fr]">
      <Logo />

      <nav className="hidden items-center gap-1 justify-self-center md:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-pill px-3.5 py-2 text-[0.84375rem] font-semibold text-fg-2 no-underline transition-colors hover:bg-subtle hover:text-fg"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4.5 justify-self-end">
        {/* Icons */}
        <div className="flex items-center gap-2.5">
          {user && (
            <IconButton href="/profile" aria-label="Profile">
              <UserIcon />
            </IconButton>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <Button href="/create" variant="primary" className="gap-1.5">
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
          </Button>
          {user ? (
            <form action="/auth/signout" method="post">
              <Button type="submit">Sign out</Button>
            </form>
          ) : (
            <Button href="/auth">Sign in</Button>
          )}
        </div>
      </div>
    </header>
  );
}
