'use client';

import { Button } from '../../_components/ui/button';
import { Input } from '../../_components/ui/input';
import { login } from './actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, SchemaType } from '../schema';
import { useServerAction } from 'zsa-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../_components/ui/form';
import { toast } from 'sonner';

export const LoginForm = () => {
  const { execute, isPending } = useServerAction(login);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: SchemaType) {
    const [, err] = await execute(values);

    if (err) {
      let message: string;

      if (err.code === 'NOT_AUTHORIZED') {
        message = err.message;
      } else {
        message = 'There was an error. Please try again';
      }

      toast.error(message);
      return;
    }

    toast.success('Successfully logged in');
    form.reset({ username: '', password: '' });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[384px] flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="coolbob123" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" loading={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};
