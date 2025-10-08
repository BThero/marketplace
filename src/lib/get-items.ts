import { db } from '@/db/drizzle.js';
import { item as itemTable } from '@/db/schema.js';

export const getItems = async () => {
  const items = await db.query.item.findMany({
    orderBy: [itemTable.title],
    where: (fields, operators) => {
      return operators.eq(fields.isClaimed, false);
    },
  });
  return items;
};

export type Items = Awaited<ReturnType<typeof getItems>>;
export type Item = Items[number];
