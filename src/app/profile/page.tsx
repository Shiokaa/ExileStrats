import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { avatarUrl, displayName } from '@/lib/supabase/user';
import { getStrategiesByAuthor } from '@/features/strategy/queries';
import { StrategyCard } from '@/features/strategy/components/strategy-card';
import { OwnerActions } from '@/features/strategy/components/owner-actions';
import { UserIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Profile — ExileStrats' };

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  const name = displayName(user, 'Account');
  const avatar = avatarUrl(user);

  const strategies = await getStrategiesByAuthor(user.id);

  return (
    <div className="flex flex-col gap-10 pt-12">
      {/* User panel — solid surface */}
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-4 rounded-panel border border-line bg-surface p-[40px] text-center">
        <span className="eyebrow mb-2">Exile · Profile</span>
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={name}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-line"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface-2 text-fg-2">
            <UserIcon size={30} />
          </span>
        )}
        <h1 className="font-display text-[26px] font-bold text-fg">{name}</h1>
        {user.email && <p className="text-[13px] text-fg-3">{user.email}</p>}
        <form action="/auth/signout" method="post" className="mt-2">
          <Button type="submit">Sign out</Button>
        </form>
      </div>

      {/* My strategies */}
      <section>
        <div className="mb-[14px] flex items-center justify-between gap-3 border-b border-line-soft pb-[14px]">
          <span className="eyebrow">My Strategies</span>
          <span className="font-mono text-[13px] text-fg-3">{strategies.length}</span>
        </div>

        {strategies.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-panel border border-line bg-surface p-[40px] text-center">
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-fg-2">
              You haven&apos;t published any strategy yet.
            </p>
            <Button href="/create" variant="primary">
              Create one
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-[14px]">
            {strategies.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <StrategyCard strategy={s} />
                <OwnerActions slug={s.slug} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
