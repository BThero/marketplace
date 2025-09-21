import type { Toast } from '@/lib/toasts.js';
import type { Child, FC } from 'hono/jsx';

export const Layout: FC<{ toast?: Toast; children: Child }> = ({
  toast,
  children,
}) => {
  return (
    <html lang="en">
      <head>
        <title>Tim's Marketplace</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="color-scheme" content="light dark" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.sand.min.css"
        />
        <link rel="stylesheet" href="/public/overrides.css" />
      </head>
      <body>
        {children}
        {toast ? (
          <article class={`toast ${toast.type}`}>{toast.text}</article>
        ) : null}
        <script src="/public/toast.js" defer />
      </body>
    </html>
  );
};
