'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function SignInButton({ className = 'btn btn-ghost' }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setLoading(false); // otherwise the browser redirects away
  }

  return (
    <button type="button" className={className} onClick={signIn} disabled={loading}>
      {loading ? 'Redirecting…' : 'Sign in'}
    </button>
  );
}
