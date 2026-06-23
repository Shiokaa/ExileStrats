'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { User } from '@supabase/supabase-js';
import { prisma } from '@/server/db/prisma';
import { getCurrentUser } from '@/lib/supabase/server';
import { difficultySchema, leagueSchema, mechanicKeySchema, strategyContentSchema } from './schema';

// Current PoE league version — kept in sync with the seed (Principe V). The Create form
// captures the league name, not the patch number, so it is filled in here.
const LEAGUE_VERSION = '3.25';

const createInputSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  mechanic: mechanicKeySchema,
  league: leagueSchema,
  difficulty: difficultySchema,
  returnPerHour: z.number().nonnegative(),
  investPerMap: z.number().nonnegative(),
  snapshotLabel: z.string().trim().optional(),
  farms: z.string().trim(),
  summary: z.string().trim(),
  steps: z.array(z.string()),
  scarabs: z.array(z.string()),
  extras: z.array(z.string()),
  atlasKind: z.enum(['link', 'image']),
  atlasLink: z.string().trim().url('Add a valid planner link or image URL.'),
  maps: z.array(z.string()),
  mapNote: z.string().trim().optional(),
  youtube: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().url('Enter a valid YouTube URL.').optional(),
  ),
});

export type CreateStrategyInput = z.input<typeof createInputSchema>;

type Result = { ok: true; slug: string } | { ok: false; error: string };
type Validated = z.infer<typeof createInputSchema>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** First free slug among `root`, `root-2`, `root-3`… (good enough for a personal app). */
async function uniqueSlug(root: string): Promise<string> {
  const base = root || 'strategy';
  let slug = base;
  for (let i = 2; await prisma.strategy.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`;
  }
  return slug;
}

/** Build + Zod-validate the row's stable fields and JSON blob from a validated form input. */
function buildStrategyData(data: Validated) {
  const scarabs = data.scarabs.map((s) => s.trim()).filter(Boolean);
  const steps = data.steps.map((s) => s.trim()).filter(Boolean);
  const extras = data.extras.map((s) => s.trim()).filter(Boolean);
  const mapNames = data.maps.map((s) => s.trim()).filter(Boolean);

  // Zod validates the JSON blob before it ever reaches the DB (Principe III/IV).
  const content = strategyContentSchema.parse({
    schemaVersion: 1,
    summary: {
      farms: data.farms,
      snapshotLeague: data.snapshotLabel || data.league,
    },
    mapDevice: {
      scarabs: scarabs.map((name) => ({ id: slugify(name), name, mechanic: data.mechanic })),
      extras: extras.length ? extras : undefined,
    },
    atlasTree: { kind: data.atlasKind, url: data.atlasLink },
    steps,
    maps: { names: mapNames, note: data.mapNote || undefined },
    media: data.youtube ? { youtube: data.youtube } : undefined,
    notes: data.summary || undefined,
  });

  return {
    title: data.title,
    league: data.league,
    leagueVersion: LEAGUE_VERSION,
    mechanic: data.mechanic,
    mechanicTags: [data.mechanic],
    difficulty: data.difficulty,
    returnPerHour: data.returnPerHour,
    investPerMap: data.investPerMap,
    scarabCount: scarabs.length,
    schemaVersion: 1,
    content,
  };
}

function authorName(user: User): string {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  return (
    (meta.user_name as string) ||
    (meta.full_name as string) ||
    (meta.name as string) ||
    user.email ||
    'Anonymous'
  );
}

function authorAvatar(user: User): string | null {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  return (meta.avatar_url as string) || (meta.picture as string) || null;
}

function revalidateStrategy(slug: string, mechanic: string, prevMechanic?: string) {
  revalidatePath('/');
  revalidatePath('/profile');
  revalidatePath('/mechanics');
  revalidatePath(`/mechanics/${mechanic}`);
  revalidatePath(`/strategy/${slug}`);
  if (prevMechanic && prevMechanic !== mechanic) revalidatePath(`/mechanics/${prevMechanic}`);
}

export async function createStrategyAction(raw: CreateStrategyInput): Promise<Result> {
  // Defence in depth: the page is auth-gated, but never trust the client.
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'You must be signed in to publish.' };

  const parsed = createInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your inputs.' };
  }

  try {
    const fields = buildStrategyData(parsed.data);
    const slug = await uniqueSlug(slugify(parsed.data.title));

    await prisma.strategy.create({
      data: {
        ...fields,
        slug,
        author: authorName(user),
        authorId: user.id,
        authorAvatar: authorAvatar(user),
        visibility: 'public',
      },
    });

    revalidateStrategy(slug, fields.mechanic);
    return { ok: true, slug };
  } catch {
    return { ok: false, error: 'Could not publish — please check your inputs and try again.' };
  }
}

export async function updateStrategyAction(
  slug: string,
  raw: CreateStrategyInput,
): Promise<Result> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'You must be signed in.' };

  const existing = await prisma.strategy.findUnique({
    where: { slug },
    select: { authorId: true, mechanic: true },
  });
  if (!existing) return { ok: false, error: 'Strategy not found.' };
  if (existing.authorId !== user.id) {
    return { ok: false, error: 'You can only edit your own strategies.' };
  }

  const parsed = createInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your inputs.' };
  }

  try {
    const fields = buildStrategyData(parsed.data);
    // Slug, author and visibility stay put — links don't break, ownership is unchanged.
    await prisma.strategy.update({ where: { slug }, data: fields });
    revalidateStrategy(slug, fields.mechanic, existing.mechanic);
    return { ok: true, slug };
  } catch {
    return { ok: false, error: 'Could not save — please check your inputs and try again.' };
  }
}

export async function deleteStrategyAction(slug: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'You must be signed in.' };

  const existing = await prisma.strategy.findUnique({
    where: { slug },
    select: { authorId: true, mechanic: true },
  });
  if (!existing) return { ok: false, error: 'Strategy not found.' };
  if (existing.authorId !== user.id) {
    return { ok: false, error: 'You can only delete your own strategies.' };
  }

  await prisma.strategy.delete({ where: { slug } });
  revalidateStrategy(slug, existing.mechanic);
  return { ok: true, slug };
}
