import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './server/db/schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

console.log('Connecting to database...');

// Use your DATABASE_URL from .env.local
const sql = postgres(env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
  max: 1, // Use a single connection for development
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Timeout after 10 seconds
  onnotice: () => {}, // Suppress notice messages
  onparameter: () => {}, // Suppress parameter messages
  debug: (connection, query, parameters) => {
    console.log('Executing query:', query);
    console.log('With parameters:', parameters);
  },
  transform: {
    undefined: null // Transform undefined to null
  }
});

// Export the Drizzle instance with schema
export const db = drizzle(sql, { schema });
