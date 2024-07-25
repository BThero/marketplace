import './dotenv';
import { defineConfig } from 'drizzle-kit';
import { env } from '@/env.mjs';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
