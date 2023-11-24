import UsersRaffle from "@/components/users-raffle";
import { getUsers } from "@/lib/turso";
import * as React from "react";

export type ISorteoPageProps = {};

export default async function SorteoPage(props: ISorteoPageProps) {
  const users = await getUsers();

  return (
    <div>
      <UsersRaffle items={users} debug={true} />
    </div>
  );
}
