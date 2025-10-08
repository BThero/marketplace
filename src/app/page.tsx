import type { Items } from '@/lib/get-items.js';
import { Fragment, type FC } from 'hono/jsx';
import { Item } from './item.js';

export const Home: FC<{ items: Items }> = ({ items }) => {
  return (
    <Fragment>
      <header class="container">
        <hgroup>
          <h1>Tim&apos;s Marketplace</h1>
          <p>Claim any item you like. For free. Anonymously</p>
        </hgroup>
      </header>

      <main class="container">
        <div class="grid grid-three-cols">
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </main>

      <footer class="container">
        <p>Built by Temirlan Baibolov</p>
      </footer>
    </Fragment>
  );
};
