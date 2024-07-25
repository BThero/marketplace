import { User } from 'lucia';
import { db } from '../db/drizzle';
import { checklist } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { Prettify } from '../lib/utils';

export const getChecklistWithItems = async ({
  userId,
  active = false,
  id,
}: {
  userId: string;
  active?: boolean;
  id?: number;
}) => {
  const res = await db.query.checklist.findFirst({
    where: (checklist, { and, eq, isNull }) =>
      and(
        id ? eq(checklist.id, id) : undefined,
        active ? isNull(checklist.completedAt) : undefined,
        eq(checklist.userId, userId)
      ),
    with: {
      items: true,
    },
  });
  return res;
};

export const getChecklist = async ({
  user,
  id,
}: {
  user: User;
  id: number;
}) => {
  const checklist = await db.query.checklist.findFirst({
    where: (checklist, { and, eq }) =>
      and(eq(checklist.id, id), eq(checklist.userId, user.id)),
  });
  return checklist;
};

export const createChecklist = async ({
  user,
  name,
}: {
  user: User;
  name: string;
}) => {
  await db.insert(checklist).values({
    userId: user.id,
    name,
  });
  return undefined;
};

export const deleteChecklist = async ({
  user,
  id,
}: {
  user: User;
  id: number;
}) => {
  await db
    .delete(checklist)
    .where(and(eq(checklist.id, id), eq(checklist.userId, user.id)));
};

export const editChecklist = async ({
  user,
  id,
  name,
}: {
  user: User;
  id: number;
  name: string;
}) => {
  await db
    .update(checklist)
    .set({
      name,
    })
    .where(and(eq(checklist.id, id), eq(checklist.userId, user.id)));
};

export const completeChecklist = async ({
  user,
  id,
}: {
  user: User;
  id: number;
}) => {
  await db
    .update(checklist)
    .set({
      completedAt: new Date(),
    })
    .where(and(eq(checklist.id, id), eq(checklist.userId, user.id)));
};

export const getAllChecklists = async ({ user }: { user: User }) => {
  const checklists = await db.query.checklist.findMany({
    where: (checklistTable, { eq, and, isNotNull }) =>
      and(
        eq(checklistTable.userId, user.id),
        isNotNull(checklistTable.completedAt)
      ),
    orderBy: (checklistTable, { desc }) => [desc(checklistTable.createdAt)],
  });
  type Checklists = typeof checklists;
  type Checklist = Checklists[number];
  type AdjustedChecklist = Prettify<
    Omit<Checklist, 'completedAt'> & {
      completedAt: Date;
    }
  >;
  return checklists as AdjustedChecklist[];
};

export type GetActiveChecklistResult = Awaited<
  ReturnType<typeof getChecklistWithItems>
>;
