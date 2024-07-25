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
import { Checklist as ChecklistType } from '../../_lib/types';
import { deleteChecklist } from '../../actions';

type DeleteButtonProps = {
  disabled?: boolean;
  checklist: ChecklistType;
};
export const DeleteButton = ({ checklist, disabled }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { execute, isPending } = useServerAction(deleteChecklist);

  return (
    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant="destructive"
          type="button"
          className="size-8"
          size="icon"
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete checklist</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your checklist? This action cannot
            be undone.
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
                id: checklist.id,
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
