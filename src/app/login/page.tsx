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
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="glass-card flex w-full max-w-[400px] flex-col items-center gap-5 rounded-panel p-[40px] text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
          <LogoMark size={30} />
        </span>
        <h1 className="font-display text-[26px] font-bold text-fg">Sign in</h1>
        <p className="text-[14px] leading-[1.6] text-fg-2">
          ExileStrats uses <strong className="text-fg">Discord</strong> to sign in. You&apos;ll be
          sent to Discord to authorize, then brought right back.
        </p>
        <SignInButton className="btn btn-primary" label="Continue with Discord" />
        <p className="text-[12px] leading-[1.5] text-fg-3">
          We only read your basic Discord profile. Nothing is ever posted on your behalf.
        </p>
      </div>
    </div>
  );
}
