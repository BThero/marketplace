// 'use client';

import Link from 'next/link';
import { formatDate } from '../../_lib/formatDate';
import { Checklist as ChecklistType } from '../_lib/types';

type HistoryItemProps = {
  checklist: ChecklistType;
};
export const HistoryItem = ({ checklist }: HistoryItemProps) => {
  return (
    <div className="flex justify-between">
      <Link href={`/history/${checklist.id}`}>
        <div className="flex gap-2 group">
          <span className="typography-small group-hover:underline">
            {checklist.name}
          </span>
          <span className="typography-small text-gray-500">
            {formatDate(checklist.createdAt)} —{' '}
            {formatDate(checklist.completedAt)}
          </span>
        </div>
      </Link>
      <div className="flex gap-1">{/* TODO */}</div>
    </div>
  );
};
