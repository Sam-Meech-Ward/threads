import { text, varchar, pgTable, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 30 })
    .notNull()
    .unique("users_username_unique", { nulls: "not distinct" }),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
