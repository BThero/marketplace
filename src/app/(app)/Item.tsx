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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {item.title}
        </h2>
        <span
          className={cn('leading-7 [&:not(:first-child)]:mt-6 text-red-500', {
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
