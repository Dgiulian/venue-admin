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

  // const count = !data.length ? 0 : data;

  // console.log(data);

  return NextResponse.json({ users: data });
};

export const POST = async (request: NextRequest) => {
  // const { email } = request.body;

  const email = "kspaducciqv@tripadvisor.com";
  const data = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  console.log(data);

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
