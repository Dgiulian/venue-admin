import { GuestTable } from "@/components/guest-table";
import * as React from "react";

import { getUsers } from "@/lib/turso";

export type IGuestListPageProps = {};

export default async function GuestListPage(props: IGuestListPageProps) {
  const users = await getUsers();
  // React.useMemo<User[]>(
  //   () =>
  //     userData.map((user) => ({
  //       ...user,
  //       register: Math.random() > 0.5 ? 0 : 1,
  //       createdAt: Date.now(),
  //       updatedAt: Date.now(),
  //     })),
  //   [],
  // );

  return (
    <div className="mx-auto max-w-4xl">
      <GuestTable users={users} />
    </div>
  );
}
