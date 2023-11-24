import Guests from "@/components/guests";
import { buttonVariants } from "@/components/ui/button";
import { getUsers } from "@/lib/turso";
import Link from "next/link";
import Sorteo from "./sorteo";

export default async function GuestListPage() {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mt-6 flex justify-between gap-4">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Volver
        </Link>

        <Sorteo users={users} />
      </div>

      <div className="mt-6">
        <Guests users={users} />
      </div>
    </div>
  );
}
