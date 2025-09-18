import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { Home } from './hono-app/page.js';
import { getItems } from './lib/getItems.js';
import { Layout } from './hono-app/layout.js';
import { getItem } from './lib/getItem.js';
import { ClaimForm } from './hono-app/claim-form.js';
import { validator } from 'hono/validator';
import { claimItem } from './lib/claimItem.js';

const app = new Hono();

app.get('/', async (c) => {
  const items = await getItems();
  return c.html(
    <Layout>
      <Home items={items} />
    </Layout>
  );
});

app.get('/claim/:id', async (c) => {
  const idStr = c.req.param('id');
  const id = Number(idStr);

  if (!Number.isSafeInteger(id)) {
    return c.notFound();
  }

  const item = await getItem(id);

  if (!item) {
    return c.notFound();
  }

  return c.html(
    <Layout>
      <ClaimForm item={item} />
    </Layout>
  );
});

app.post(
  '/claim-action',
  validator('form', (value, c) => {
    const item = value['item'];
    const note = value['note'];

    if (typeof item !== 'string' || !item.trim().length) {
      return c.redirect('/');
    }

    if (typeof note !== 'string' || !note.trim().length) {
      return c.redirect('/');
    }

    const itemId = Number(item);

    if (!Number.isSafeInteger(itemId)) {
      return c.redirect('/');
    }

    return {
      id: itemId,
      note: note,
    };
  }),
  async (c) => {
    const { id, note } = c.req.valid('form');
    const updated = await claimItem(id, note);
    return c.redirect('/');
  }
);

app.use('/public/*', serveStatic({ root: './' }));

const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
