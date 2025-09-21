import type { Context } from 'hono';

export type Toast = {
  text: string;
  type: 'error' | 'success';
};

export const toastKinds = [
  'invalid_item_id',
  'invalid_note',
  'empty_note',
  'claim_failure',
  'claim_success',
] as const;

export type ToastKind = (typeof toastKinds)[number];

export const toasts: Record<ToastKind, Toast> = {
  invalid_item_id: {
    text: 'Item ID is invalid',
    type: 'error',
  },
  invalid_note: {
    text: 'Note is invalid',
    type: 'error',
  },
  empty_note: {
    text: 'Please fill in the note',
    type: 'error',
  },
  claim_failure: {
    text: 'Could not claim the item',
    type: 'error',
  },
  claim_success: {
    text: 'Successfully claimed',
    type: 'success',
  },
} as const;

export const appendToast = (url: string, kind: ToastKind) => {
  return `${url}?toast=${kind}`;
};

export const getToast = (c: Context): Toast | undefined => {
  const toastKind = c.req.query('toast');
  if (!toastKind) return undefined;
  const toast = toasts[toastKind as ToastKind];
  return toast ?? undefined;
};
