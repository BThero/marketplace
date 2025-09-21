import { integer, text, boolean, pgTable as table } from 'drizzle-orm/pg-core';

export const item = table('item', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  minUrl: text('min_url').notNull(),
  maxUrl: text('max_url').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  note: text('note'),
  isClaimed: boolean('is_claimed').notNull().default(false),
});
