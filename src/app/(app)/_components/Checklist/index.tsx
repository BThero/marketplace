'use client';

// Third-party imports (absolute)
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

// Project-level absolute imports
import { Button } from '@/app/_components/ui/button';

// Relative imports within the app directory
import { ChecklistItem } from '../ChecklistItem';
import { CreateChecklistItemForm } from '../CreateChecklistItemForm';
import { formatDate } from '../../_lib/formatDate';
import { Checklist as ChecklistType } from '../../_lib/types';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';
import { completeChecklist } from '../../actions';

type ChecklistProps = {
  checklist: ChecklistType;
};

export const Checklist = ({ checklist }: ChecklistProps) => {
  const { execute, isPending } = useServerAction(completeChecklist);
  const totalItemsCount = checklist.items.length;
  const completedItemsCount = checklist.items.filter(
    (item) => item.completedAt !== null
  ).length;
  const isCompleted = checklist.completedAt !== null;

  return (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-col">
        <span className="typography-detail text-gray-700">
          {formatDate(checklist.createdAt)} —{' '}
          {checklist.completedAt ? formatDate(checklist.completedAt) : 'Now'}
        </span>
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-row gap-2 items-baseline flex-1">
            <h1 className="typography-h1">{checklist.name}</h1>
            <h2 className="typography-h2">
              ({completedItemsCount}/{totalItemsCount})
            </h2>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <EditButton checklist={checklist} disabled={isPending} />
            <DeleteButton checklist={checklist} />
            {!isCompleted && (
              <Button
                type="button"
                className="h-8"
                onClick={async () => {
                  const [_data, error] = await execute({
                    id: checklist.id,
                  });

                  if (error) {
                    toast.error('Some error occurred');
                  } else {
                    toast.success('Successfully completed');
                  }
                }}
                loading={isPending}
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 empty:hidden">
        {checklist.items.map((item) => (
          <ChecklistItem key={item.id} item={item} isStatic={isCompleted} />
        ))}
      </div>
      {!isCompleted && <CreateChecklistItemForm checklistId={checklist.id} />}
    </div>
  );
};
