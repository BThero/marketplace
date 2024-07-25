'use client';

// Third-party imports (absolute)
import { useState } from 'react';
import { useServerAction } from 'zsa-react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Project-level absolute imports
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';

// Relative imports within the app directory
import { ChecklistItem as ChecklistItemType } from '../../_lib/types';
import { deleteChecklistItem } from '../../actions';

type DeleteButtonProps = {
  disabled?: boolean;
  checklistItem: ChecklistItemType;
};
export const DeleteButton = ({
  checklistItem,
  disabled,
}: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { execute, isPending } = useServerAction(deleteChecklistItem);

  return (
    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          disabled={disabled}
          className="h-5 w-5"
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete checklist item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this checklist item? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="w-min"
            type="button"
            loading={isPending}
            onClick={async () => {
              const [_data, error] = await execute({
                id: checklistItem.id,
              });
              if (error) {
                toast.error('Some error occurred');
              } else {
                toast.success('Successfully deleted');
              }
              setIsDeleting(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-min"
            disabled={isPending}
            onClick={() => {
              setIsDeleting(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
