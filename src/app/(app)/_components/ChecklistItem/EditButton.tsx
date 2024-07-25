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
import { ChecklistItem as ChecklistItemType } from '../../_lib/types';
import { renameChecklistItem } from '../../actions';
import { renameChecklistItemSchema } from '../../_lib/schema';
import { z } from 'zod';

const formSchema = renameChecklistItemSchema.omit({ id: true });
type FormSchemaType = z.infer<typeof formSchema>;

type EditButtonProps = {
  disabled?: boolean;
  checklistItem: ChecklistItemType;
};
export const EditButton = ({ disabled, checklistItem }: EditButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { execute, isPending } = useServerAction(renameChecklistItem);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: checklistItem.description,
    },
  });

  async function onSubmit(values: FormSchemaType) {
    const [, err] = await execute({ ...values, id: checklistItem.id });

    if (err) {
      toast.error('There was an error. Please try again');
      return;
    } else {
      toast.success('Checklist was updated');
      setIsEditing(false);
    }

    form.reset({ description: '' });
  }

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          className="h-5 w-5"
          onClick={async () => {
            setIsEditing(true);
            form.reset({ description: checklistItem.description });
          }}
        >
          <Edit3 className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit checklist item</DialogTitle>
          <DialogDescription>
            Make changes to your checklist item here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (what) => {
              console.log({ what });
            })}
            id={`hello-${checklistItem.id}`}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Oranges..."
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
