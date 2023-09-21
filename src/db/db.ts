import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';
 
const client = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN });
 
const db = drizzle(client);

export default db;
 
// const result = await db.select().from(users).all()