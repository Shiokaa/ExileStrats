import type { User } from '@supabase/supabase-js';

// Supabase types `user_metadata` as Record<string, unknown>; narrow safely rather than cast.
function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}

function meta(user: User): Record<string, unknown> {
  return (user.user_metadata ?? {}) as Record<string, unknown>;
}

/** Best display name from Discord/email metadata (Discord username → full name → name → email). */
export function displayName(user: User, fallback = 'Anonymous'): string {
  const m = meta(user);
  return str(m.user_name) ?? str(m.full_name) ?? str(m.name) ?? str(user.email) ?? fallback;
}

/** Discord avatar URL, or null. */
export function avatarUrl(user: User): string | null {
  const m = meta(user);
  return str(m.avatar_url) ?? str(m.picture) ?? null;
}
