import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { SignInButton } from '@/components/auth/sign-in-button';
import { LogoMark } from '@/components/layout/logo-mark';

export const metadata: Metadata = { title: 'Sign in — ExileStrats' };
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/');

  return (
    <div className="pt-12">
      <div className="glass-card mx-auto grid max-w-[920px] overflow-hidden rounded-panel md:grid-cols-2">
        {/* Left — sign in */}
        <div className="flex flex-col justify-center gap-5 p-[40px]">
          <h1 className="font-display text-[28px] font-bold text-fg">Sign in</h1>
          <p className="text-[14px] leading-[1.6] text-fg-2">
            ExileStrats uses <strong className="text-fg">Discord</strong> to sign in. You&apos;ll be
            sent to Discord to authorize, then brought right back.
          </p>
          <SignInButton className="btn btn-primary" label="Continue with Discord" />
          <p className="text-[12px] leading-[1.5] text-fg-3">
            We only read your basic Discord profile (name + avatar). Nothing is ever posted on your
            behalf.
          </p>
        </div>

        {/* Right — branding */}
        <div className="hidden flex-col justify-center gap-4 border-l border-border bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] p-[40px] md:flex">
          <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
            <LogoMark size={30} />
          </span>
          <div className="font-display text-[22px] font-bold tracking-[0.015em] text-fg">
            EXILESTRATS
          </div>
          <p className="text-[14px] leading-[1.6] text-fg-2">
            Path of Exile mapping strategies as clean, scannable fiches. Compose, share, and read at
            a glance on your second screen.
          </p>
          <p className="text-[13px] leading-[1.6] text-fg-3">
            Guides, not hype — profit is always shown next to difficulty, never oversold.
          </p>
        </div>
      </div>
    </div>
  );
}
