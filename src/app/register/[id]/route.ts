import { users } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { register } = await request.json();
  const updatedUser = await db
    .update(users)
    .set({ register })
    .where(eq(users.id, params.id))
    .returning();
  return Response.json({ user: updatedUser });
};
