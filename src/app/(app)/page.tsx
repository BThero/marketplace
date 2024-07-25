import { CreateChecklistForm } from './_components/CreateChecklistForm';
import { getChecklistWithItems } from '@/data-access/checklist';
import { Checklist } from './_components/Checklist';
import { getUser } from '@/lib/getUser';

const Home = async () => {
  const user = await getUser({ required: true });
  const activeChecklist = await getChecklistWithItems({
    active: true,
    userId: user.id,
  });

  if (!activeChecklist) {
    return (
      <div className="flex-1 flex justify-center w-full pt-[280px]">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="typography-h1">Ready to get started?</h1>
          <CreateChecklistForm />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex justify-center pt-12">
      <Checklist checklist={activeChecklist} />
    </div>
  );
};

export default Home;
