import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono, type Context } from 'hono';
import { Home } from './hono-app/page.js';
import { getItems } from './lib/getItems.js';
import { Layout } from './hono-app/layout.js';
import { getItem } from './lib/getItem.js';
import { ClaimForm } from './hono-app/claim-form.js';
import { validator } from 'hono/validator';
import { claimItem } from './lib/claimItem.js';
import { toasts, type Toast, type ToastKind } from './lib/toasts.js';

const appendToast = (url: string, kind: ToastKind) => {
  return `${url}?toast=${kind}`;
};

const getToast = (c: Context): Toast | undefined => {
  const toastKind = c.req.query('toast');
  if (!toastKind) return undefined;
  const toast = toasts[toastKind as ToastKind];
  return toast ?? undefined;
};

const app = new Hono();

app.get('/', async (c) => {
  const items = await getItems();
  const toast = getToast(c);
  return c.html(
    <Layout toast={toast}>
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

  const toast = getToast(c);
  return c.html(
    <Layout toast={toast}>
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
      return c.redirect(appendToast('/', 'invalid_item_id'));
    }

    const itemId = Number(item);

    if (!Number.isSafeInteger(itemId)) {
      return c.redirect('/');
    }

    if (typeof note !== 'string') {
      return c.redirect(appendToast(`/claim/${itemId}`, 'invalid_note'));
    }

    if (!note.trim().length) {
      return c.redirect(appendToast(`/claim/${itemId}`, 'empty_note'));
    }

    return {
      id: itemId,
      note: note,
    };
  }),
  async (c) => {
    const { id, note } = c.req.valid('form');
    const updated = await claimItem(id, note);
    return c.redirect(
      appendToast('/', updated ? 'claim_success' : 'claim_failure')
    );
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
