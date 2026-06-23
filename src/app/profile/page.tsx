import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  const meta = user.user_metadata ?? {};
  const name =
    (meta.user_name as string) ??
    (meta.full_name as string) ??
    (meta.name as string) ??
    user.email ??
    'Account';
  const avatar = (meta.avatar_url as string) ?? (meta.picture as string) ?? null;

  return (
    <div className="pt-12">
      <div className="glass-card mx-auto flex max-w-[480px] flex-col items-center gap-4 rounded-panel p-[40px] text-center">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-subtle text-fg-2">
            <svg
              width="30"
              height="30"
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
          </span>
        )}
        <h1 className="font-display text-[26px] font-semibold text-fg">{name}</h1>
        {user.email && <p className="text-[13px] text-fg-3">{user.email}</p>}
        <form action="/auth/signout" method="post" className="mt-2">
          <button type="submit" className="btn btn-ghost">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
