import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/turso";
import { users } from "@/drizzle/schema";
import { nanoid } from "nanoid";

export const revalidate = 60;

export const GET = async (
  request: NextRequest,
  { params }: { params: { nombre: string } },
) => {
  const nombre = z.string().parse(params.nombre);

  const data = await db
    .select()
    .from(users)
    .where(eq(users.fullName, nombre))
    .all();

  return NextResponse.json({ users: data });
};

export const POST = async (
  request: NextRequest,
  // { params }: { params: { nombre: string } },
) => {
  const body = await request.json();

  const nombre = z.string().parse(body.nombre).trim();
  const data = await db
    .select()
    .from(users)
    .where(eq(users.fullName, nombre))
    .get();

  console.log(nombre, data);
  if (data) {
    return NextResponse.json({ user: data });
  }

  const newUser = await db
    .insert(users)
    .values({
      id: nanoid(),
      fullName: nombre,
      firstName: null,
      lastName: null,
      email: null,
      register: 1,
      mesa: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning()
    .get();

  return NextResponse.json({ user: newUser });
};
