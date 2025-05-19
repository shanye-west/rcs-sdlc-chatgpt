import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './server/db/schema';

// Use your DATABASE_URL from .env.local
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false }
});

// Export the Drizzle instance with schema
export const db = drizzle(sql, { schema });
