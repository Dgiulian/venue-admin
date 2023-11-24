"use client";
import Guests from "@/components/guests";
import { buttonVariants } from "@/components/ui/button";
// import { getUsers } from "@/lib/turso";
import Link from "next/link";
import Sorteo from "./sorteo";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

export default function GuestListPage() {
  // const users = await getUsers();
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    function loadData() {
      fetch("/users")
        .then((res) => res.json())
        .then((resp) => {
          setUsers(resp.users);
        });
    }
    loadData();
  }, []);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mt-6 flex justify-between gap-4">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Volver
        </Link>

        {users && <Sorteo users={users} />}
      </div>

      <div className="mt-6">
        {users ? <Guests users={users} /> : <p>Cargando datos...</p>}
      </div>
    </div>
  );
}
