import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Single, typed entry point for environment variables (server + client split).
 * Read vars from here — never `process.env` directly.
 *
 * `skipValidation` on CI lets credential-free builds (GitHub Actions sets `CI=true`)
 * succeed; real validation still runs at runtime in production. Defaults are skipped
 * when validation is skipped, so don't rely on Zod `.default()` for required behaviour.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  // NEXT_PUBLIC vars must be destructured manually (Next inlines them at build).
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
