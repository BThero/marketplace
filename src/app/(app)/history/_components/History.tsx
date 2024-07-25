import { Checklists as ChecklistsType } from '../_lib/types';
import { HistoryItem } from './HistoryItem';

type HistoryProps = {
  checklists: ChecklistsType;
};
export const History = ({ checklists }: HistoryProps) => {
  return (
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="flex flex-row gap-2 items-baseline">
        <h1 className="typography-h1">History</h1>
        <h2 className="typography-h2">({checklists.length} items)</h2>
      </div>
      <div className="flex flex-col gap-4">
        {checklists.map((checklist) => (
          <HistoryItem checklist={checklist} key={checklist.id} />
        ))}
      </div>
    </div>
  );
};
