import { UserAvatar } from './UserAvatar';
import { Navigation } from './Navigation';
import { getUser } from '@/lib/getUser';

export const Header = async () => {
  const user = await getUser({ required: true });
  return (
    <div className="h-[72px] w-full px-6 py-4 flex flex-row items-center justify-between border-b border-b-slate-300">
      <div className="flex flex-row items-center gap-4">
        <span className="typography-large">Checklists</span>
        <Navigation />
      </div>
      <UserAvatar user={user} />
    </div>
  );
};
