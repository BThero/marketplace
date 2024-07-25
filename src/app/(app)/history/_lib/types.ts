import { getAllChecklists } from '../../../../data-access/checklist';

export type Checklists = Awaited<ReturnType<typeof getAllChecklists>>;
export type Checklist = Checklists[number];
