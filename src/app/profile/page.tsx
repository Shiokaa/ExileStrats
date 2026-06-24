import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { avatarUrl, displayName } from '@/lib/supabase/user';
import { getStrategiesByAuthor } from '@/features/strategy/queries';
import { StrategyCard } from '@/features/strategy/components/strategy-card';
import { OwnerActions } from '@/features/strategy/components/owner-actions';
import { UserIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  const name = displayName(user, 'Account');
  const avatar = avatarUrl(user);

  const strategies = await getStrategiesByAuthor(user.id);

  return (
    <div className="flex flex-col gap-10 pt-12">
      <div className="glass-card mx-auto flex w-full max-w-[480px] flex-col items-center gap-4 rounded-panel p-[40px] text-center">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-subtle text-fg-2">
            <UserIcon size={30} />
          </span>
        )}
        <h1 className="font-display text-[26px] font-semibold text-fg">{name}</h1>
        {user.email && <p className="text-[13px] text-fg-3">{user.email}</p>}
        <form action="/auth/signout" method="post" className="mt-2">
          <Button type="submit">Sign out</Button>
        </form>
      </div>

      <section>
        <div className="mb-[14px] flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[22px] font-semibold text-fg">My strategies</h2>
          <span className="text-[13px] text-fg-3">{strategies.length}</span>
        </div>

        {strategies.length === 0 ? (
          <div className="glass-card flex flex-col items-center gap-4 rounded-panel p-[40px] text-center">
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-fg-2">
              You haven&apos;t published any strategy yet.
            </p>
            <Button href="/create" variant="primary">
              Create one
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
