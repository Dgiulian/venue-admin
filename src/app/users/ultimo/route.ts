import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";

export const GET = async (request: NextRequest) => {
  const data = await db
    .select()
    .from(users)
    .where(eq(users.register, 1))
    .orderBy(desc(users.updatedAt))
    .limit(1)
    .get();

  return NextResponse.json({ users: data });
};
