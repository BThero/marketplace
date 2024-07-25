'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from '@node-rs/argon2';
import { createServerAction, ZSAError } from 'zsa';
import { schema } from '../schema';

export const login = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { username, password } = input;
    const existingUser = await db.query.user.findFirst({
      where: eq(user.username, username.toLowerCase()),
    });

    if (!existingUser) {
      throw new ZSAError('NOT_AUTHORIZED', 'Incorrect username or password');
    }

    const validPassword = await verify(existingUser.password_hash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid usernames.
      // However, valid usernames can be already be revealed with the signup page among other methods.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
      // If usernames are public, you can outright tell the user that the username is invalid.
      throw new ZSAError('NOT_AUTHORIZED', 'Incorrect username or password');
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect('/');
  });
