import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";

export const POST = async (request: NextRequest) => {
  const data = await db
    .select()
    .from(users)
    .where(eq(users.register, 1))
    .orderBy(desc(users.updatedAt))
    .limit(1)
    .get();
  // const sql = await db
  //   .select()
  //   .from(users)
  //   .where(eq(users.register, 1))
  //   .orderBy(desc(users.updatedAt))
  //   .limit(1)
  //   .toSQL();

  // console.log(sql);

  return NextResponse.json({ users: data });
};
