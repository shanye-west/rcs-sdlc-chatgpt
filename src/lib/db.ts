mkdir -p src/lib
cat > src/lib/db.ts << 'EOF'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Use your DATABASE_URL from .env.local
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false }
});

// Export the Drizzle instance
export const db = drizzle(sql);
EOF
