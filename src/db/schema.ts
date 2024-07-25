import { relations } from 'drizzle-orm';
import { integer, text, pgTableCreator, timestamp } from 'drizzle-orm/pg-core';

const pgTable = pgTableCreator((name) => `sandyq_${name}`);

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  password_hash: text('password_hash').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const checklist = pgTable('checklist', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
  completedAt: timestamp('completed_at', {
    withTimezone: true,
    mode: 'date',
  }),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
});

export const checklistItem = pgTable('checklist_item', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  description: text('description').notNull(),
  completedAt: timestamp('completed_at', {
    withTimezone: true,
    mode: 'date',
  }),
  checklistId: integer('checklist_id')
    .references(() => checklist.id, { onDelete: 'cascade' })
    .notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  checklists: many(checklist),
}));

export const checklistRelations = relations(checklist, ({ one, many }) => ({
  user: one(user, {
    fields: [checklist.userId],
    references: [user.id],
  }),
  items: many(checklistItem),
}));

export const checklistItemRelations = relations(checklistItem, ({ one }) => ({
  checklist: one(checklist, {
    fields: [checklistItem.checklistId],
    references: [checklist.id],
  }),
}));
