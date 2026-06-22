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

/** A scarab slot — stored by id; resolved to an icon once the pipeline lands (Principe V). */
export const scarabSchema = z.object({
  id: z.string(),
  name: z.string(),
  mechanic: mechanicKeySchema,
});

/** Atlas tree — V1 level 0 only: a planner link or a captured image (no interactive editor). */
export const atlasTreeSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('link'), url: z.string().url() }),
  z.object({ kind: z.literal('image'), url: z.string() }),
]);

/**
 * Versioned strategy body. New leagues change the shape of juicing systems, so the blob
 * is versioned by `schemaVersion` via a discriminated union — evolve the body without a
 * SQL migration (Principe III).
 */
export const strategyContentSchema = z.discriminatedUnion('schemaVersion', [
  z.object({
    schemaVersion: z.literal(1),
    summary: z.object({
      /** What you farm — the TL;DR headline. */
      farms: z.string(),
      /** Manual, timestamped snapshot label, e.g. "est. 3.25". */
      snapshotLeague: z.string(),
    }),
    /** Map device: up to 5 scarabs (+ free modifiers like sextants/kirac). No fragments in V1. */
    mapDevice: z.object({
      scarabs: z.array(scarabSchema).max(5),
      extras: z.array(z.string()).optional(),
    }),
    atlasTree: atlasTreeSchema,
    steps: z.array(z.string()),
    maps: z.object({
      names: z.array(z.string()),
      note: z.string().optional(),
    }),
    media: z
      .object({
        youtube: z.string().url().optional(),
      })
      .optional(),
    notes: z.string().optional(),
  }),
]);
