import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";
import * as schema from "@/drizzle/schema";
import { users } from "@/drizzle/schema";
import { desc, eq, gt } from "drizzle-orm";

interface Env {
  TURSO_DB_AUTH_TOKEN?: string;
  TURSO_DB_URL?: string;
}
const url = (process.env as unknown as Env).TURSO_DB_URL?.trim();
if (url === undefined) {
  throw new Error("TURSO_DB_URL is not defined");
}

const authToken = (process.env as unknown as Env).TURSO_DB_AUTH_TOKEN?.trim();
if (authToken === undefined) {
  throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
}
const connection = createClient({
  url: process.env.TURSO_DB_URL || "",
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
});

export const db = drizzle(connection, { schema });

export async function getUsers() {
  const data = await db
    .select()
    .from(users)
    .where(gt(users.register, 0))
    .orderBy(desc(users.register))
    .all();
  return data ?? [];
}

export async function markWinner(userId: string) {
  const updatedUser = await db
    .update(users)
    .set({ register: 0 })
    .where(eq(users.id, userId))
    .returning();
  return updatedUser;
}
