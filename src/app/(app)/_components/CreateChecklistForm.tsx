'use client';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { useServerAction } from 'zsa-react';
import { createChecklist } from '../actions';
import {
  createChecklistSchema,
  CreateChecklistSchemaType,
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

export const CreateChecklistForm = () => {
  const { execute, isPending } = useServerAction(createChecklist);

  const form = useForm<CreateChecklistSchemaType>({
    resolver: zodResolver(createChecklistSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: CreateChecklistSchemaType) {
    const [, err] = await execute(values);

    if (err) {
      toast.error('There was an error. Please try again');
      return;
    } else {
      toast.success('Checklist created');
    }

    form.reset({ name: '' });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[384px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Checklist Name</FormLabel>
              <div className="flex flex-row gap-2">
                <FormControl>
                  <Input
                    placeholder="Groceries"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <Button type="submit" className="w-min" loading={isPending}>
                  Create
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
