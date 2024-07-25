'use client';

import { useServerAction } from 'zsa-react';
import { Loader2 } from 'lucide-react';
import { toggleChecklistItem } from '../../actions';
import { Checkbox } from '../../../_components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formatDate } from '../../_lib/formatDate';
import { ChecklistItem as ChecklistItemType } from '../../_lib/types';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';

type ChecklistItemProps = {
  item: ChecklistItemType;
  isStatic: boolean;
};
export const ChecklistItem = ({ item, isStatic }: ChecklistItemProps) => {
  const { execute, isPending } = useServerAction(toggleChecklistItem);
  const isCompleted = item.completedAt !== null;

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Checkbox
          id={`checkbox-${item.id}`}
          checked={isCompleted}
          onCheckedChange={async () => {
            const [_data, error] = await execute({ id: item.id });
            if (error) {
              toast.error('Some error occurred');
              return;
            } else {
              toast.success('Successfully updated');
            }
          }}
          disabled={isPending || isStatic}
        />
        <label
          className={cn('typography-small', { 'line-through': isCompleted })}
        >
          {item.description}
        </label>
        {isCompleted && (
          <span className="typography-small text-gray-500">
            {formatDate(item.completedAt!)}
          </span>
        )}
        {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
      </div>
      <div className="flex gap-1">
        <EditButton checklistItem={item} disabled={isPending} />
        {!isStatic && (
          <DeleteButton checklistItem={item} disabled={isPending} />
        )}
      </div>
    </div>
  );
};
