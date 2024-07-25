import { z } from 'zod';

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(31, { message: 'Username must be at most 31 characters.' })
    .regex(/^[a-z0-9_-]+$/, {
      message:
        'Username can contain only lowercase letters, digits, undescores (_) and dashes (-)',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(255, { message: 'Password must be at most 255 characters.' }),
});

export type SchemaType = z.infer<typeof schema>;
