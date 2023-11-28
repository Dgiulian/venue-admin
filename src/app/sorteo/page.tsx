import UsersRaffle from "@/components/users-raffle";
import { getUsers } from "@/lib/turso";
import * as React from "react";

export type ISorteoPageProps = {
  searchParams: { [key: string]: string };
};

const CLevels = [
  "Micheletti, Federico",
  "Armento, Ignacio",
  "Aranguren, Marco",
  "Arano, Luis",
  "Martinez, Adrian",
  "Radaelli, Damián",
  "Lieste, Gustavo",

  "Elias Ezequiel Gerala",
  "Günther Jürgensen",
  "Walter Andrés Vallejos",
  "Rafael Sanchez Blanco",
  "Gerala Jorge Nahir",
  "Emmanuel Schulze",
  "Gabriel Agustin Mateos",
  "Silvana Andrea Darnes",
  "Victoria Macarena Martin",
  "Romina Gomiero",
  "Carolina Riquelme",
  "Ricardo Delgado",
  "Alejandro Bravo",
  "Mestre, Sebastian",
  "Gauvron, Cristian",
  "Vilches, Joaquin",
];

export default async function SorteoPage({ searchParams }: ISorteoPageProps) {
  const users = await getUsers();

  return (
    <div>
      <UsersRaffle
        items={users.filter(
          (user) => user.fullName && !CLevels.includes(user.fullName),
        )}
        debug={typeof searchParams.debug !== "undefined"}
      />
    </div>
  );
}
