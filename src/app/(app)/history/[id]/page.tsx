import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { getUser } from '../../../../lib/getUser';
import { getChecklistWithItems } from '../../../../data-access/checklist';
import { Checklist } from '../../_components/Checklist';

type Params = {
  id: string;
};
const HistoryItemPage = async ({ params }: { params: Params }) => {
  const user = await getUser({ required: true });
  const id = Number(params.id);
  if (isNaN(id)) {
    toast.error('History item not found');
    redirect('/history');
  }
  const checklist = await getChecklistWithItems({ userId: user.id, id });
  if (!checklist) {
    toast.error('History item not found');
    redirect('/history');
  }
  return (
    <div className="flex-1 w-full flex justify-center pt-12">
      <Checklist checklist={checklist} />
    </div>
  );
};

export default HistoryItemPage;
