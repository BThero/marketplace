import type { Items } from '@/lib/getItems.js';
import { Fragment, type FC } from 'hono/jsx';
import { Item } from './item.js';

function groupBy<T>(items: T[], num: number): T[][] {
  const result: T[][] = [[]];
  for (const item of items) {
    if (result.at(-1)!.length == num) {
      result.push([]);
    }
    result.at(-1)?.push(item);
  }
  return result;
}

export const Home: FC<{ items: Items }> = ({ items }) => {
  const groupedItems = groupBy(items, 3);
  return (
    <Fragment>
      <header class="container">
        <hgroup>
          <h1>Tim&apos;s Marketplace</h1>
          <p>Claim any item you like. For free. Anonymously</p>
        </hgroup>
      </header>

      <main class="container">
        {groupedItems.map((itemGroup) => (
          <div class="grid">
            {itemGroup.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        ))}
      </main>
    </Fragment>
  );
};
