import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/types";
import { Check, Crosshair, QrCode, X } from "lucide-react";
import { QRReaderDialog } from "./qr-reader-dialog";
import QRDialog from "./qr-dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { formatTimestamp, getUserDisplayName } from "@/lib/utils";

type GuestTableProps = {
  users: User[];
};

export function GuestTable({ users }: GuestTableProps) {
  const [selectedUser, setSelectedUser] = useState("");

  const registerUser = (user: User) => {
    fetch(`register/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        register: user.register ? 0 : 1,
      }),
    })
      .then((res: Response) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        // window.location.reload();
      });
  };

  return (
    <Table>
      <TableCaption>Lista de invitados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Nombre</TableHead>
          <TableHead>Mesa</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="w-12">Registrado</TableHead>
          <TableHead className="w-12">QR</TableHead>
          <TableHead className="hidden w-12 md:table-cell">Hora</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="w-auto font-medium">
              {getUserDisplayName(user)}
            </TableCell>
            <TableCell>{user.mesa}</TableCell>
            <TableCell className="hidden md:table-cell">
              <a
                href={`/qr?email=${user.email}`}
                className="hover:underline "
                target="_blank"
              >
                {user.email}
              </a>
            </TableCell>
            <TableCell className="text-center">
              {user.register ? (
                <Check className="text-green-500" />
              ) : (
                <X className=" text-red-400" />
              )}
            </TableCell>
            <TableCell>
              {
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setSelectedUser(user.fullName ?? "")}
                >
                  <QrCode />
                </Button>
              }
            </TableCell>
            <TableCell>
              {
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => registerUser(user)}
                >
                  <Crosshair />
                </Button>
              }
            </TableCell>
            <TableCell>{formatTimestamp(user.updatedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
      <QRDialog
        open={!!selectedUser}
        value={selectedUser}
        setOpen={() => {
          setSelectedUser("");
        }}
      />
    </Table>
  );
}
