import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { v4 as uuidv4 } from "uuid";
// import { loremIpsum } from "lorem-ipsum";
import usersData from "@/data/MOCK_DATA.json";
import inquirer from "inquirer";
import * as schema from "@/drizzle/schema";
import { loadCsv } from "../../scripts/loadCSV";
import path from "path";
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

type User = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  fullName?: string | null;
  email?: string | null;
  createdAt?: number;
  updatedAt?: number;
};

async function seed(usersData: User[]) {
  const storedUsers: any = await db
    .insert(schema.users)
    .values(usersData)
    .returning()
    .all();

  console.log("Inserted ", storedUsers.length, " users!");

  process.exit(0);
}
(async function () {
  const answers = await inquirer.prompt([
    { type: "confirm", name: "delete", message: "Delete users data?" },
  ]);

  if (answers.delete) {
    console.log("Deleting users data");
    await db.delete(schema.users);
  }

  const users: string[] = await loadCsv(
    path.join("scripts", "Listado para sorteo.csv"),
  );
  console.log(users);

  seed(
    users.map((user) => ({
      id: uuidv4(),
      first_name: null,
      last_name: null,
      fullName: user,
      email: null,
      register: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    })),
  );
})();

function getRandomTimestamp(): number {
  const now = new Date().getTime();
  const randomOffset = (Math.random() - 0.5) * 25 * 60 * 1000; // Random offset within +/- 25 minutes in milliseconds
  const randomTimestamp = now + randomOffset;
  return randomTimestamp;
}
