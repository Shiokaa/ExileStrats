import 'server-only';
import type { Strategy } from '@/generated/prisma/client';
import { prisma } from '@/server/db/prisma';
import type { MechanicKey } from '@/data/game/mechanics';
import { strategyContentSchema, strategySummarySchema } from './schema';
import type { StrategyDetail, StrategySummary } from './types';

const DAY = 86_400_000;

/**
 * Data-access layer (server-only). Prisma's `Json` type is untyped, so the content blob
 * is validated with Zod on every read; the summary is validated too (Principe III/IV).
 */
function toSummary(row: Strategy): StrategySummary {
  const updatedDaysAgo = Math.max(0, Math.floor((Date.now() - row.updatedAt.getTime()) / DAY));
  return strategySummarySchema.parse({
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: row.author,
    authorAvatar: row.authorAvatar ?? null,
    league: row.league,
    mechanic: row.mechanic,
    mechanicTags: row.mechanicTags,
    tier: row.tier ?? undefined,
    difficulty: row.difficulty,
    returnPerHour: row.returnPerHour,
    investPerMap: row.investPerMap,
    scarabCount: row.scarabCount,
    updatedDaysAgo,
  });
}

export async function getStrategies(): Promise<StrategySummary[]> {
  const rows = await prisma.strategy.findMany({
    where: { visibility: 'public' },
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map(toSummary);
}

export async function getStrategiesByMechanic(mechanic: MechanicKey): Promise<StrategySummary[]> {
  const rows = await prisma.strategy.findMany({
    where: { visibility: 'public', mechanic },
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map(toSummary);
}

export async function getStrategyCountsByMechanic(): Promise<Record<string, number>> {
  const grouped = await prisma.strategy.groupBy({
    by: ['mechanic'],
    where: { visibility: 'public' },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.mechanic] = g._count._all;
  return counts;
}

/** Detail + the author's UUID (kept server-side for ownership checks — never sent to the client). */
export async function getStrategyBySlug(
  slug: string,
): Promise<(StrategyDetail & { authorId: string | null }) | null> {
  const row = await prisma.strategy.findUnique({ where: { slug } });
  if (!row || row.visibility !== 'public') return null;
  const content = strategyContentSchema.parse(row.content);
  return { summary: toSummary(row), content, authorId: row.authorId };
}

/** Every strategy authored by `authorId` (all visibilities — it's the owner's own list). */
export async function getStrategiesByAuthor(authorId: string): Promise<StrategySummary[]> {
  const rows = await prisma.strategy.findMany({
    where: { authorId },
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map(toSummary);
}

/** Up to `limit` other public strategies sharing the mechanic (then any), for the "similar" rail. */
export async function getSimilarStrategies(
  slug: string,
  mechanic: MechanicKey,
  limit = 3,
): Promise<StrategySummary[]> {
  const rows = await prisma.strategy.findMany({
    where: { visibility: 'public', slug: { not: slug } },
    orderBy: { updatedAt: 'desc' },
  });
  const summaries = rows.map(toSummary);
  const sameMechanic = summaries.filter((s) => s.mechanic === mechanic);
  const rest = summaries.filter((s) => s.mechanic !== mechanic);
  return [...sameMechanic, ...rest].slice(0, limit);
}
