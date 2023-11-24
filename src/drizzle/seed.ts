import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// import { v4 as uuidv4 } from "uuid";
// import { loremIpsum } from "lorem-ipsum";
import usersData from "@/data/MOCK_DATA.json";

import * as schema from "@/drizzle/schema";
// import type { User } from "@/lib/types";

console.log({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
});

const client = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
});

const db = drizzle(client, { schema });

async function seed() {
  const storedUsers: any = await db
    .insert(schema.users)
    .values(
      usersData.map((user) => ({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        createdAt: getRandomTimestamp(),
        updatedAt: getRandomTimestamp(),
      })),
    )
    .returning()
    .all();

  console.log("Inserted ", storedUsers.length, " users!");

  process.exit(0);
}

seed();

function getRandomTimestamp(): number {
  const now = new Date().getTime();
  const randomOffset = (Math.random() - 0.5) * 25 * 60 * 1000; // Random offset within +/- 25 minutes in milliseconds
  const randomTimestamp = now + randomOffset;
  return randomTimestamp;
}
