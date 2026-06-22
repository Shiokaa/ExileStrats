import type { User } from '@supabase/supabase-js';

function displayName(user: User): string {
  const meta = user.user_metadata ?? {};
  return (
    (meta.user_name as string) ??
    (meta.full_name as string) ??
    (meta.name as string) ??
    user.email ??
    'Account'
  );
}

export function UserMenu({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <span className="max-w-[140px] truncate text-[13px] font-semibold text-fg-2">
        {displayName(user)}
      </span>
      <form action="/auth/signout" method="post">
        <button type="submit" className="btn btn-ghost">
          Sign out
        </button>
      </form>
    </div>
  );
}
