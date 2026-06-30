'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { NavLink } from './nav-links';
import { Button } from '@/components/ui/button';

export function MobileNav({ links, isAuthed }: { links: readonly NavLink[]; isAuthed: boolean }) {
  const [open, setOpen] = useState(false);

  // The header (and this island) persists across navigations, so close the drawer
  // on click of any navigational item rather than reacting to the pathname in an
  // effect (the project avoids setState-in-effect).
  const close = () => setOpen(false);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Scroll-lock while drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((v) => !v)}
        className="relative z-40 flex size-10 items-center justify-center rounded-pill text-fg-2 transition-colors hover:bg-subtle hover:text-fg"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 cursor-default bg-black/40"
          />
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            className="glass-panel fixed inset-x-3 top-20 z-40 flex flex-col gap-1 rounded-panel p-3"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-pill px-3.5 py-2.5 text-sm font-semibold text-fg-2 no-underline transition-colors hover:bg-subtle hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 flex gap-2 border-t border-line pt-3">
              <Button
                href="/create"
                variant="primary"
                onClick={close}
                className="flex-1 justify-center"
              >
                Create
              </Button>
              {isAuthed ? (
                <form action="/auth/signout" method="post" className="flex-1">
                  <Button type="submit" className="w-full justify-center">
                    Sign out
                  </Button>
                </form>
              ) : (
                <Button href="/auth" onClick={close} className="flex-1 justify-center">
                  Sign in
                </Button>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
