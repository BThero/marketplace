import { getUser } from '../../../lib/getUser';
import * as db from '@/data-access';
import { History } from './_components/History';

const HistoryPage = async () => {
  const user = await getUser({ required: true });
  const checklists = await db.checklist.getAllChecklists({ user });

  return (
    <div className="flex-1 w-full flex justify-center pt-[68px]">
      <History checklists={checklists} />
    </div>
  );
};

export default HistoryPage;
