import { GuestTable } from "@/components/guest-table";
import * as React from "react";
import userData from "@/data/MOCK_DATA.json";
import { User } from "@/lib/types";

export type IGuestListPageProps = {};

export default function GuestListPage(props: IGuestListPageProps) {
  const users = React.useMemo<User[]>(
    () =>
      userData.map((user) => ({
        ...user,
        register: Math.random() > 0.5 ? 0 : 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })),
    [],
  );
  return (
    <div className="mx-auto max-w-4xl">
      <GuestTable users={users} />
    </div>
  );
}
