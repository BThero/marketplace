'use server';

import { db } from '@/db/drizzle';
import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { generateIdFromEntropySize } from 'lucia';
import { user } from '../../../db/schema';
import { createServerAction } from 'zsa';
import { schema } from '../schema';

export const signUp = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { username, password } = input;
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long

    // TODO: check if username is already used
    await db.insert(user).values({
      id: userId,
      username: username,
      password_hash: passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect('/');
  });
