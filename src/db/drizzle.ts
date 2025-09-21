import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema });
