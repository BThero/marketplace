import { db } from '@/db/drizzle.js';

export const getItem = async (id: number) => {
  const item = await db.query.item.findFirst({
    where: (fields, operators) => {
      return operators.eq(fields.id, id);
    },
  });
  return item;
};

export type MaybeItem = Awaited<ReturnType<typeof getItem>>;
export type Item = NonNullable<MaybeItem>;
