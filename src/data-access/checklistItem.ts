import { User } from 'lucia';
import { db } from '../db/drizzle';
import { checklistItem as checklistItemTable } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export const createChecklistItem = async ({
  description,
  checklistId,
}: {
  description: string;
  checklistId: number;
}) => {
  await db.insert(checklistItemTable).values({
    description,
    checklistId,
  });
  return undefined;
};

export const getChecklistItem = async ({ id }: { id: number }) => {
  const checklistItem = await db.query.checklistItem.findFirst({
    where: (checklistItem, { eq }) => eq(checklistItem.id, id),
    with: {
      checklist: {
        columns: {
          userId: true,
        },
      },
    },
  });
  return checklistItem;
};

export const updateChecklistItem = async ({
  id,
  completedAt,
  description,
}: {
  id: number;
  completedAt?: Date | null;
  description?: string;
}) => {
  await db
    .update(checklistItemTable)
    .set({
      ...(completedAt !== undefined && { completedAt }),
      ...(description !== undefined && { description }),
    })
    .where(eq(checklistItemTable.id, id));
  return undefined;
};

export const deleteChecklistItem = async ({ id }: { id: number }) => {
  await db.delete(checklistItemTable).where(eq(checklistItemTable.id, id));
  return undefined;
};
