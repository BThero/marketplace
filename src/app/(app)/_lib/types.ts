import { GetActiveChecklistResult } from '../../../data-access/checklist';

export type Checklist = NonNullable<GetActiveChecklistResult>;
export type ChecklistItem = Checklist['items'][number];
