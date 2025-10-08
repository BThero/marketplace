import { integer, text, boolean, pgTable as table } from 'drizzle-orm/pg-core';

export const item = table('item', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  imageUrl: text('image_url').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  note: text('note'),
  isClaimed: boolean('is_claimed').notNull().default(false),
});
