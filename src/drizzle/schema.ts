import { sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
    mesa: integer("mesa").notNull(),
    register: integer("register").default(0),
    createdAt: integer("createdAt").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updatedAt").default(sql`(cast (unixepoch () as int))`),
  },
  (users) => ({
    emailIdx: uniqueIndex("email_idx").on(users.email),
    // firstNameLastNameAddressIdx: index("first_name_last_name_address_idx").on(
    //   users.firstName,
    //   users.lastName,
    //   users.address
    // ),
  }),
);
