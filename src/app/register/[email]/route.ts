import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";

export const GET = async (
  request: NextRequest,
  { params }: { params: { email: string } },
) => {
  const email = z.string().parse(params.email);

  const data = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .all();

  return NextResponse.json({ users: data });
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { email: string } },
) => {
  const email = z.string().parse(params.email);
  const data = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (!data) {
    return NextResponse.json({ user: null });
  }

  const updatedUser = await db
    .update(users)
    .set({
      register: 1,
    })
    .where(eq(users.email, email))
    .returning()
    .get();

  return NextResponse.json({ user: updatedUser });
};
