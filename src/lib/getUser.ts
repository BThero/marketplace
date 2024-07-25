import { cache } from 'react';
import { validateRequest } from './validateRequest';
import { redirect } from 'next/navigation';
import { User } from 'lucia';

type Options<R extends boolean = false> = {
  required: R;
  onUnauthenticated?: () => void;
};

type ReturnValue<R extends boolean = false> = R extends true
  ? User
  : User | null;

export const getUser = cache(
  async <R extends boolean>(options?: Options<R>): Promise<ReturnValue<R>> => {
    const { user } = await validateRequest();
    const { required, onUnauthenticated } = options ?? {};

    if (required && !user) {
      if (onUnauthenticated) {
        onUnauthenticated();
      } else {
        redirect('/login');
      }
    }

    return user as ReturnValue<R>;
  }
);
