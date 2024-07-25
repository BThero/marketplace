'use client';

// Third-party imports (absolute)
import { useState } from 'react';
import { useServerAction } from 'zsa-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit3 } from 'lucide-react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';

// Relative imports within the app directory
import { Checklist as ChecklistType } from '../../_lib/types';
import { updateChecklist } from '../../actions';
import {
  updateChecklistSchema,
  UpdateChecklistSchemaType,
} from '../../_lib/schema';

type EditButtonProps = {
  disabled?: boolean;
  checklist: ChecklistType;
};
export const EditButton = ({ disabled, checklist }: EditButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { execute, isPending } = useServerAction(updateChecklist);

  const form = useForm<UpdateChecklistSchemaType>({
    resolver: zodResolver(updateChecklistSchema),
    defaultValues: {
      id: checklist.id,
      name: checklist.name,
    },
  });

  async function onSubmit(values: UpdateChecklistSchemaType) {
    const [, err] = await execute(values);

    if (err) {
      toast.error('There was an error. Please try again');
      return;
    } else {
      toast.success('Checklist was updated');
      setIsEditing(false);
    }

    form.reset({ name: '' });
  }

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="size-8"
          size="icon"
          onClick={() => {
            setIsEditing(true);
            form.reset({ name: checklist.name });
          }}
          disabled={disabled}
        >
          <Edit3 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit checklist</DialogTitle>
          <DialogDescription>
            Make changes to your checklist here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Checklist Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Groceries"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" className="w-min" loading={isPending}>
                Save
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-min"
                disabled={isPending}
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
