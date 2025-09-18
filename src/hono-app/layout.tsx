import type { FC } from 'hono/jsx';

export const Layout: FC = (props) => {
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
        <link rel="stylesheet" href="/public/pico.sand.min.css" />
        <link rel="stylesheet" href="/public/overrides.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};
