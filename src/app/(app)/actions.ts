'use server';

import { z } from 'zod';
import { createServerAction } from 'zsa';
import { db } from '../../db/drizzle';
import { item as itemTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  id: z.number(),
  note: z.string(),
});

export const claimItem = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { id, note } = input;
    await db.transaction(async (tx) => {
      const item = await tx.query.item.findFirst({
        where(fields, operators) {
          return operators.eq(fields.id, id);
        },
      });
      if (!item || item.isClaimed === true) {
        throw new Error('Item not found or already claimed');
      }
      await tx
        .update(itemTable)
        .set({
          isClaimed: true,
          note: note,
        })
        .where(eq(itemTable.id, id));
    });
    revalidatePath('/');
    return true;
  });
