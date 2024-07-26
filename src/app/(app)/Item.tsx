import { item as itemTable } from '../../db/schema';
import { cn } from '../../lib/utils';
import { ItemImage } from './ItemImage';

type ItemProps = {
  item: typeof itemTable.$inferSelect;
};
export const Item = ({ item }: ItemProps) => {
  const isClaimed = item.isClaimed;
  return (
    <div>
      <header className="flex gap-2 items-baseline">
        <h2 className="typography-h2">{item.title}</h2>
        <span
          className={cn('typography-p text-red-500', {
            'text-green-500': !isClaimed,
          })}
        >
          {isClaimed ? 'Claimed' : 'Not claimed'}
        </span>
      </header>
      <ItemImage item={item} />
    </div>
  );
};
