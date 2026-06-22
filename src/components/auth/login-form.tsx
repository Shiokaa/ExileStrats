'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cx } from '@/lib/utils';

type Provider = 'discord' | 'google' | 'twitch';

const PROVIDERS: { id: Provider; label: string; bg: string }[] = [
  { id: 'discord', label: 'Discord', bg: '#5865F2' },
  { id: 'google', label: 'Google', bg: '#DB4437' },
  { id: 'twitch', label: 'Twitch', bg: '#9146FF' },
];

const field =
  'h-12 w-full rounded-input border border-border bg-[var(--input-bg)] px-4 text-[14px] text-fg outline-none placeholder:text-fg-3';

export function LoginForm() {
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

  async function oauth(provider: Provider) {
    setError(null);
    setBusy(true);
    const { error } = await supabase().auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirect() },
    });
    if (error) {
      setBusy(false);
      setError(`${provider} sign-in isn't enabled yet.`);
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
      const { error } = await supabase().auth.signUp({
        email,
        password,
        options: { data: { user_name: name }, emailRedirectTo: redirect() },
      });
      setBusy(false);
      if (error) setError(error.message);
      else setInfo('Check your email to confirm your account, then sign in.');
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

      {/* OAuth providers */}
      <div className="grid grid-cols-3 gap-3">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Continue with ${p.label}`}
            onClick={() => oauth(p.id)}
            disabled={busy}
            className="flex h-12 items-center justify-center rounded-input text-[13px] font-semibold text-white disabled:opacity-60"
            style={{ background: p.bg }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold tracking-[0.08em] text-fg-3">OR USE EMAIL</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Email form */}
      <form onSubmit={submitEmail} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={field}
        />
        {tab === 'signup' && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={field}
          />
        )}
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={field}
        />

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
              I accept the <span className="text-accent">Terms of Service</span> and{' '}
              <span className="text-accent">Privacy Policy</span>.
            </span>
          </label>
        )}
      </form>

      {error && <p className="mt-4 text-[13px] text-[#C0392B]">{error}</p>}
      {info && <p className="mt-4 text-[13px] text-fg-2">{info}</p>}
    </div>
  );
}
