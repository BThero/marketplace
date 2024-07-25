'use server';

import { createServerAction, ZSAError } from 'zsa';
import {
  createChecklistItemSchema,
  createChecklistSchema,
  deleteChecklistItemSchema,
  deleteChecklistSchema,
  updateChecklistSchema,
  toggleChecklistItemSchema,
  completeChecklistSchema,
  renameChecklistItemSchema,
} from './_lib/schema';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/getUser';
import * as db from '@/data-access';

export const createChecklist = createServerAction()
  .input(createChecklistSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    await db.checklist.createChecklist({ user, name: input.name });
    revalidatePath('/');
    return undefined;
  });

export const deleteChecklist = createServerAction()
  .input(deleteChecklistSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    await db.checklist.deleteChecklist({ user, id: input.id });
    revalidatePath('/');
    return undefined;
  });

export const updateChecklist = createServerAction()
  .input(updateChecklistSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    await db.checklist.editChecklist({ user, id: input.id, name: input.name });
    revalidatePath('/');
    return undefined;
  });

export const completeChecklist = createServerAction()
  .input(completeChecklistSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    await db.checklist.completeChecklist({ user, id: input.id });
    revalidatePath('/');
    return undefined;
  });

export const createChecklistItem = createServerAction()
  .input(createChecklistItemSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    const { description, checklistId } = input;
    const checklist = await db.checklist.getChecklist({
      user,
      id: checklistId,
    });
    if (!checklist) {
      throw new ZSAError('NOT_FOUND', 'Checklist was not found');
    }
    if (checklist.completedAt !== null) {
      throw new ZSAError('FORBIDDEN', 'Checklist is already completed');
    }
    await db.checklistItem.createChecklistItem({
      description,
      checklistId,
    });
    revalidatePath('/');
    return undefined;
  });

export const toggleChecklistItem = createServerAction()
  .input(toggleChecklistItemSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    const { id } = input;
    const checklistItem = await db.checklistItem.getChecklistItem({ id });
    if (!checklistItem || checklistItem.checklist.userId !== user.id) {
      throw new ZSAError('NOT_FOUND', 'Checklist item was not found');
    }
    await db.checklistItem.updateChecklistItem({
      id,
      completedAt: checklistItem.completedAt === null ? new Date() : null,
    });
    revalidatePath('/');
    return undefined;
  });

export const renameChecklistItem = createServerAction()
  .input(renameChecklistItemSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    const { id, description } = input;
    const checklistItem = await db.checklistItem.getChecklistItem({ id });
    if (!checklistItem || checklistItem.checklist.userId !== user.id) {
      throw new ZSAError('NOT_FOUND', 'Checklist item was not found');
    }
    await db.checklistItem.updateChecklistItem({
      id,
      description,
    });
    revalidatePath('/');
    return undefined;
  });

export const deleteChecklistItem = createServerAction()
  .input(deleteChecklistItemSchema)
  .handler(async ({ input }) => {
    const user = await getUser({
      required: true,
      onUnauthenticated: () => {
        throw new ZSAError(
          'NOT_AUTHORIZED',
          'You are not authorised to perform this action'
        );
      },
    });
    const { id } = input;
    const checklistItem = await db.checklistItem.getChecklistItem({ id });
    if (!checklistItem || checklistItem.checklist.userId !== user.id) {
      throw new ZSAError('NOT_FOUND', 'Checklist item was not found');
    }
    await db.checklistItem.deleteChecklistItem({ id });
    revalidatePath('/');
    return undefined;
  });
