import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = { title: 'Sign in — ExileStrats' };
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/');

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <LoginForm />
    </div>
  );
}
