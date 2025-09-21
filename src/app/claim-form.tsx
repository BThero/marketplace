import type { Item } from '@/lib/get-item.js';
import { resolveMaxUrl } from '@/lib/resolve-url.js';
import { Fragment, type FC } from 'hono/jsx';

export const ClaimForm: FC<{ item: Item }> = ({ item }) => {
  return (
    <Fragment>
      <header class="container narrow">
        <header>
          <hgroup>
            <h1>Claim Item</h1>
            <p>{item.title}</p>
          </hgroup>
        </header>
        <div>
          <img src={resolveMaxUrl(item.imageUrl)} height={0} alt={item.title} />
        </div>
      </header>

      <main class="container narrow">
        <form action="/claim-action" method="post">
          <label for="note">Your note for Tim</label>
          <input
            type="text"
            id="note"
            name="note"
            placeholder="Hi from Bob..."
          />
          <input type="hidden" id="item" name="item" value={item.id} required />
          <small>Please include your name.</small>
          <button type="submit">Claim</button>
        </form>
      </main>
    </Fragment>
  );
};
