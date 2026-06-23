'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/server/db/prisma';
import { getCurrentUser } from '@/lib/supabase/server';
import {
  difficultySchema,
  leagueSchema,
  mechanicKeySchema,
  strategyContentSchema,
} from './schema';

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
  farms: z.string().trim(),
  summary: z.string().trim(),
  steps: z.array(z.string()),
  scarabs: z.array(z.string()),
  atlasLink: z.string().trim().url('Add a valid planner link or image URL.'),
});

export type CreateStrategyInput = z.input<typeof createInputSchema>;

type Result = { ok: true; slug: string } | { ok: false; error: string };

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

export async function createStrategyAction(raw: CreateStrategyInput): Promise<Result> {
  // Defence in depth: the page is auth-gated, but never trust the client.
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'You must be signed in to publish.' };

  const parsed = createInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your inputs.' };
  }
  const data = parsed.data;

  try {
    const scarabs = data.scarabs.map((s) => s.trim()).filter(Boolean);
    const steps = data.steps.map((s) => s.trim()).filter(Boolean);

    // Zod validates the JSON blob before it ever reaches the DB (Principe III/IV).
    const content = strategyContentSchema.parse({
      schemaVersion: 1,
      summary: { farms: data.farms, snapshotLeague: data.league },
      mapDevice: {
        scarabs: scarabs.map((name) => ({ id: slugify(name), name, mechanic: data.mechanic })),
      },
      atlasTree: { kind: 'link', url: data.atlasLink },
      steps,
      maps: { names: [] },
      notes: data.summary || undefined,
    });

    const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
    const author =
      (meta.user_name as string) ||
      (meta.full_name as string) ||
      (meta.name as string) ||
      user.email ||
      'Anonymous';

    const slug = await uniqueSlug(slugify(data.title));

    await prisma.strategy.create({
      data: {
        slug,
        title: data.title,
        author,
        authorId: user.id,
        league: data.league,
        leagueVersion: LEAGUE_VERSION,
        mechanic: data.mechanic,
        mechanicTags: [data.mechanic],
        difficulty: data.difficulty,
        returnPerHour: data.returnPerHour,
        investPerMap: data.investPerMap,
        scarabCount: scarabs.length,
        visibility: 'public',
        schemaVersion: 1,
        content,
      },
    });

    revalidatePath('/');
    revalidatePath('/mechanics');
    revalidatePath(`/mechanics/${data.mechanic}`);
    return { ok: true, slug };
  } catch {
    return { ok: false, error: 'Could not publish — please check your inputs and try again.' };
  }
}
