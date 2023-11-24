import { GuestTable } from "@/components/guest-table";
import * as React from "react";

import { getUsers } from "@/lib/turso";
import Sorteo from "./sorteo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function GuestListPage() {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mt-6 flex gap-4">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Volver
        </Link>

        <Sorteo users={users} />
      </div>
      <div className="mt-6">
        <GuestTable users={users} />
      </div>
    </div>
  );
}
