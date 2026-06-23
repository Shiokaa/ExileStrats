import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { AuthForm } from '@/components/auth/auth-form';

export const metadata: Metadata = { title: 'Sign in — ExileStrats' };
export const dynamic = 'force-dynamic';

export default async function AuthPage() {
  if (await getCurrentUser()) redirect('/');

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <AuthForm />
    </div>
  );
}
