import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Single, typed entry point for environment variables (server + client split).
 * Add vars here as features need them — never read `process.env` directly elsewhere.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  client: {},
  experimental__runtimeEnv: {},
});
