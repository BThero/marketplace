import type { Item as ItemType } from '@/lib/get-items.js';
import { resolveMinUrl } from '@/lib/resolve-url.js';
import { type FC } from 'hono/jsx';

export const Item: FC<{ item: ItemType }> = ({ item }) => {
  return (
    <article>
      <header>
        <h2>{item.title}</h2>
      </header>
      <div>
        <img src={resolveMinUrl(item.imageUrl)} height={0} alt={item.title} />
      </div>
      <footer>
        <div role="group">
          <a href={`/claim/${item.id}`} role="button">
            Claim
          </a>
        </div>
      </footer>
    </article>
  );
};
