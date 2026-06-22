import { z } from 'zod';
import { MECHANIC_KEYS } from '@/data/game/mechanics';
import { LEAGUES } from '@/data/game/leagues';

/**
 * Zod is the source of truth — types are inferred from these schemas (see types.ts).
 * The strategy body lives in a single versioned JSON blob (`content`); the relational
 * layer only carries the stable, filterable summary used by listings.
 */

export const mechanicKeySchema = z.enum(MECHANIC_KEYS);
export const leagueSchema = z.enum(LEAGUES);
export const difficultySchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export const tierSchema = z.enum(['S', 'A', 'B', 'C']);

/** Summary = what listings/cards filter and sort on (the relational, denormalised part). */
export const strategySummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string().min(3),
  author: z.string(),
  league: leagueSchema,
  mechanic: mechanicKeySchema,
  mechanicTags: z.array(mechanicKeySchema).min(1),
  tier: tierSchema.optional(),
  difficulty: difficultySchema,
  /** Estimated return, divines per hour (manual timestamped snapshot — never live). */
  returnPerHour: z.number().nonnegative(),
  /** Investment, chaos per map. */
  investPerMap: z.number().nonnegative(),
  scarabCount: z.number().int().min(0).max(5),
  updatedDaysAgo: z.number().int().nonnegative(),
});

/**
 * Versioned strategy body. New leagues change the shape of juicing systems, so the blob
 * is versioned by `schemaVersion` via a discriminated union — evolve the body without a
 * SQL migration (Principe III). v1 is intentionally minimal; future versions extend it.
 */
export const strategyContentSchema = z.discriminatedUnion('schemaVersion', [
  z.object({
    schemaVersion: z.literal(1),
    summary: z.object({
      farms: z.string(),
      snapshotLeague: z.string(),
    }),
    steps: z.array(z.string()),
    notes: z.string().optional(),
  }),
]);
