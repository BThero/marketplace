'use client';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { useServerAction } from 'zsa-react';
import { createChecklistItem } from '../actions';
import {
  createChecklistItemSchema,
  CreateChecklistItemSchemaType,
} from '../_lib/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';

type CreateChecklistItemFormProps = {
  checklistId: number;
};
export const CreateChecklistItemForm = ({
  checklistId,
}: CreateChecklistItemFormProps) => {
  const { execute, isPending } = useServerAction(createChecklistItem);

  const form = useForm<CreateChecklistItemSchemaType>({
    resolver: zodResolver(createChecklistItemSchema),
    defaultValues: {
      checklistId,
      description: '',
    },
  });

  async function onSubmit(values: CreateChecklistItemSchemaType) {
    console.log({ values });
    const [, err] = await execute(values);

    if (err) {
      console.error(err);
      toast.error('There was an error. Please try again');
      return;
    } else {
      toast.success('Checklist created');
    }

    form.reset({ description: '' });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[384px]">
        <FormField
          control={form.control}
          name="checklistId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden"
                  placeholder="Oranges..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a new item</FormLabel>
              <div className="flex flex-row gap-2">
                <FormControl>
                  <Input
                    placeholder="Oranges..."
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <Button type="submit" className="w-min" loading={isPending}>
                  Add
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
