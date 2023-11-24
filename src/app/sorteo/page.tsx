import UsersRaffle from "@/components/users-raffle";
import { getUsers } from "@/lib/turso";
import * as React from "react";

export type ISorteoPageProps = {
  searchParams: { [key: string]: string };
};

export default async function SorteoPage({ searchParams }: ISorteoPageProps) {
  const users = await getUsers();

  return (
    <div>
      <UsersRaffle
        items={users}
        debug={typeof searchParams.debug !== "undefined"}
      />
    </div>
  );
}
