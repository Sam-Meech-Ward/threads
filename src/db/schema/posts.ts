import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
 
export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    content: text('name'),
    timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`).notNull(),

    // denormalized data
    totalLikes: integer('total_likes').default(0).notNull(),
    totalReplies: integer('total_replies').default(0).notNull(),
    totalComments: integer('total_replies').default(0).notNull(),
  }
);
 
// export const cities = sqliteTable('cities', {
//   id: integer('id').primaryKey(),
//   name: text('name'),
//   countryId: integer('country_id').references(() => posts.id),
  
// },
// (cities) => ({
//   nameIdx: uniqueIndex('nameIdx').on(cities.name),
// }))