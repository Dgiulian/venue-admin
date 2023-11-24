import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";

export const POST = async (request: NextRequest) => {
  const data = await db
    .select()
    .from(users)
    .orderBy(desc(users.register), desc(users.updatedAt))
    .all();

  return NextResponse.json({ users: data });
};
