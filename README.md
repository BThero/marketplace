# Marketplace App

A very basic web-app which renders a list of items and allows anyone to claim them anonymously. If someone claims an item, they will have to leave a note. The note allows you to identify and contact the right person.

Useful when doing giveaways. Used twice successfully.

# Tech Stack

- Built with [Hono](https://hono.dev), [DrizzleORM](https://orm.drizzle.team), [PostgreSQL](https://www.postgresql.org) and [PicoCSS](https://picocss.com);
- Uses [Node.js 22](https://nodejs.org/en) and [pnpm 10](https://pnpm.io);
- Deployed using [Coolify](https://coolify.io).

# Setup

1. Copy the `.env.example` file and name it `.env.local`;
2. Use `DATABASE_URL` to point to your PostgreSQL database;
3. Set `NODE_ENV` to `development` (in production, set it to `production` respectively);
4. Run `pnpm db:push` to create the tables for the first time;

# Uploading items

1. Upload all images of your items into the `/public/items` folder. I strongly recommend that you follow the `this_is_my_image.jpg` naming convention;
2. Run `pnpm images:generate` to generate min/max versions of your images;
3. Now you can safely delete the original images. There should be two new subdirectories `/public/items/max` and `public/items/min`;
4. Run `pnpm images:insert` to populate your DB with items for each image;
5. You can manually go through each newly inserted item and update its title and description.

# Development

- To run in development mode, just use `pnpm dev`;
- To run in production mode, use `pnpm build` and `pnpm start`;
- The server should be active on port 3000.
