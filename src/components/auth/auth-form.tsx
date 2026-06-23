'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a16 16 0 0 1 3.7 1.2 15 15 0 0 0-12.9 0A16 16 0 0 1 9.3 4.4L9 4a17 17 0 0 0-4.3 1.3C2 9 1.4 13.6 1.7 18a17 17 0 0 0 5 2.5l.6-.9a11 11 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 9.9 0l.4.3a11 11 0 0 1-1.7.8l.6.9a17 17 0 0 0 5-2.5c.4-5.2-.6-9.7-3.9-12.7ZM8.9 15.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
  </svg>
);

export function AuthForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithDiscord() {
    setError(null);
    setBusy(true);
    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;
    const { error } = await createClient().auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo },
    });
    if (error) {
      setBusy(false);
      setError(error.message);
    }
  }

  return (
    <div className="glass-card w-full max-w-[420px] rounded-panel p-[34px]">
      <h1 className="font-display text-[26px] font-semibold text-fg">Sign in</h1>
      <p className="mt-2 mb-6 text-[14px] leading-[1.5] text-fg-2">
        Use your Discord account to compose and share strategies.
      </p>

      <button
        type="button"
        onClick={signInWithDiscord}
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-input text-[14px] font-semibold text-white transition-[transform,filter] hover:-translate-y-px hover:brightness-110 disabled:opacity-60"
        style={{ background: '#5865F2' }}
      >
        <DiscordIcon />
        {busy ? 'Redirecting…' : 'Continue with Discord'}
      </button>

      {error && <p className="mt-4 text-[13px] text-[#C0392B]">{error}</p>}
    </div>
  );
}
