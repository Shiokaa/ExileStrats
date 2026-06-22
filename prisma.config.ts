import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Direct (non-pooled) connection used by the CLI for migrations. Falls back to '' so
// `prisma generate` (CI / postinstall) works without credentials; `migrate`/`seed` need
// the real value from `.env`.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DIRECT_URL ?? '',
  },
});
