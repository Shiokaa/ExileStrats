import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { sampleStrategies } from '@/features/strategy/data';
import { getStrategyDetail } from '@/features/strategy/detail-data';

const DAY = 86_400_000;

// Prefer the direct (non-pooled) connection for the seed script — more reliable than
// the transaction pooler for a batch of writes.
const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const s of sampleStrategies) {
    const detail = getStrategyDetail(s.slug);
    if (!detail) continue;

    const data = {
      slug: s.slug,
      title: s.title,
      author: s.author,
      league: s.league,
      leagueVersion: '3.25',
      mechanic: s.mechanic,
      mechanicTags: s.mechanicTags,
      tier: s.tier ?? null,
      difficulty: s.difficulty,
      returnPerHour: s.returnPerHour,
      investPerMap: s.investPerMap,
      scarabCount: s.scarabCount,
      visibility: 'public',
      schemaVersion: detail.content.schemaVersion,
      content: detail.content,
      updatedAt: new Date(Date.now() - s.updatedDaysAgo * DAY),
    };

    await prisma.strategy.upsert({
      where: { slug: s.slug },
      create: data,
      update: data,
    });
  }

  const count = await prisma.strategy.count();
  console.log(`Seed complete — ${count} strategies in the database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
