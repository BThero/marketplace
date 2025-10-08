import { db } from '@/db/drizzle.js';
import { item as itemTable } from '@/db/schema.js';
import { eq } from 'drizzle-orm';

export const claimItem = async (id: number, note: string) => {
  const item = await db
    .update(itemTable)
    .set({
      isClaimed: true,
      note: note,
    })
    .where(eq(itemTable.id, id))
    .returning({ id: itemTable.id });
  return item.length > 0;
};
