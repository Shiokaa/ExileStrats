'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cx } from '@/lib/utils';

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a16 16 0 0 1 3.7 1.2 15 15 0 0 0-12.9 0A16 16 0 0 1 9.3 4.4L9 4a17 17 0 0 0-4.3 1.3C2 9 1.4 13.6 1.7 18a17 17 0 0 0 5 2.5l.6-.9a11 11 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 9.9 0l.4.3a11 11 0 0 1-1.7.8l.6.9a17 17 0 0 0 5-2.5c.4-5.2-.6-9.7-3.9-12.7ZM8.9 15.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="16"
    height="16"
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
);
const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

function Field({
  icon,
  ...props
}: { icon: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-3">
        {icon}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-input border border-border bg-[var(--input-bg)] pr-4 pl-11 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-accent"
      />
    </div>
  );
}

export function AuthForm() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const supabase = () => createClient();
  const redirect = () =>
    typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;

  async function signInWithDiscord() {
    setError(null);
    setBusy(true);
    const { error } = await supabase().auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: redirect() },
    });
    if (error) {
      setBusy(false);
      setError(error.message);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (tab === 'signup' && !accepted) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setBusy(true);
    if (tab === 'signup') {
      const { data, error } = await supabase().auth.signUp({
        email,
        password,
        options: { data: { user_name: name }, emailRedirectTo: redirect() },
      });
      if (error) {
        setBusy(false);
        setError(error.message);
      } else if (data.session) {
        // Email confirmation disabled — the user is signed in immediately.
        window.location.assign('/');
      } else {
        setBusy(false);
        setInfo('Check your email to confirm your account, then sign in.');
      }
    } else {
      const { error } = await supabase().auth.signInWithPassword({ email, password });
      if (error) {
        setBusy(false);
        setError(error.message);
      } else {
        window.location.assign('/');
      }
    }
  }

  return (
    <div className="glass-card w-full max-w-[420px] rounded-panel p-[34px]">
      {/* Tabs */}
      <div className="mb-6 flex gap-6 border-b border-border">
        {(['signin', 'signup'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setError(null);
              setInfo(null);
            }}
            className={cx(
              '-mb-px cursor-pointer border-b-2 pb-3 font-display text-[18px] font-semibold transition-colors',
              tab === t ? 'border-accent text-fg' : 'border-transparent text-fg-3 hover:text-fg-2',
            )}
          >
            {t === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        ))}
      </div>

      {/* Discord */}
      <button
        type="button"
        onClick={signInWithDiscord}
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-input text-[14px] font-semibold text-white transition-[transform,filter] hover:-translate-y-px hover:brightness-110 disabled:opacity-60"
        style={{ background: '#5865F2' }}
      >
        <DiscordIcon />
        Continue with Discord
      </button>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold tracking-[0.08em] text-fg-3">OR USE EMAIL</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Email form */}
      <form onSubmit={submitEmail} className="flex flex-col gap-3">
        <Field
          icon={<MailIcon />}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {tab === 'signup' && (
          <Field
            icon={<UserIcon />}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        )}
        <Field
          icon={<LockIcon />}
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {tab === 'signup' && (
          <p className="text-[12px] leading-[1.4] text-fg-3">
            At least 6 characters, with an uppercase letter, a lowercase letter and a digit.
          </p>
        )}

        <button type="submit" disabled={busy} className="btn btn-primary mt-1 h-12 justify-center">
          {busy ? '…' : tab === 'signin' ? 'SIGN IN' : 'SIGN UP'}
        </button>

        {tab === 'signup' && (
          <label className="mt-1 flex items-start gap-2 text-[13px] leading-[1.5] text-fg-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 accent-[var(--accent)]"
            />
            <span>
              I accept the{' '}
              <Link href="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        )}
      </form>

      {error && <p className="mt-4 text-[13px] text-[#C0392B]">{error}</p>}
      {info && <p className="mt-4 text-[13px] text-fg-2">{info}</p>}
    </div>
  );
}
