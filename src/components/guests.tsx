"use client";
import React from "react";
import { GuestTable } from "./guest-table";
import { User } from "@/lib/types";
import { Input } from "./ui/input";
import { Check, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { register } from "module";
import { Separator } from "./ui/separator";

type GuestsProps = {
  users: User[];
};

export function Guests({ users }: GuestsProps) {
  const [filter, setFilter] = React.useState("");
  const [register, setRegister] = React.useState<string>("all");
  const filteredUsers = React.useMemo(() => {
    return users
      .filter(
        (user) =>
          filter === "" ||
          user.fullName?.includes(filter) ||
          user.firstName?.includes(filter) ||
          user.lastName?.includes(filter) ||
          user.email?.includes(filter),
      )
      .filter((user) => register === "all" || user.register === +register);
  }, [users, filter, register]);

  return (
    <div className="mt-6">
      <div className="my-4 flex">
        <Input
          placeholder="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="ml-4">
          <ToggleGroup
            type="single"
            value={register?.toString()}
            onValueChange={(e) => setRegister(e)}
          >
            <ToggleGroupItem value="all" aria-label="Todos">
              Todos
            </ToggleGroupItem>
            <ToggleGroupItem value="1" aria-label="Registrados">
              <Check className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="0" aria-label="No Registrados">
              <X className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <Separator />
      <GuestTable users={filteredUsers} />
    </div>
  );
}

export default Guests;
