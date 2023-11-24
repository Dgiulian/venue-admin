import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";

export const GET = async (request: NextRequest) => {
  const data = await db
    .select()
    .from(users)
    .orderBy(desc(users.register))
    .all();

  return NextResponse.json({ users: data });
};
