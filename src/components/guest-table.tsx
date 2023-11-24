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
import { Check, QrCode, X } from "lucide-react";
import { QRReaderDialog } from "./qr-reader-dialog";
import QRDialog from "./qr-dialog";
import { useState } from "react";
import { Button } from "./ui/button";

type GuestTableProps = {
  users: User[];
};

export function GuestTable({ users }: GuestTableProps) {
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <Table>
      <TableCaption>Lista de invitados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Nombre</TableHead>
          <TableHead>Mesa</TableHead>
          <TableHead className="hidden md:block">Email</TableHead>
          <TableHead className="w-12">Registrado</TableHead>
          <TableHead className="w-12">QR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="w-auto font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.mesa}</TableCell>
            <TableCell className="hidden md:block">{user.email}</TableCell>
            <TableCell className="text-center">
              {user.register ? (
                <Check className="text-green-500" />
              ) : (
                <X className=" text-red-400" />
              )}
            </TableCell>
            <TableCell>
              <Button
                variant="default"
                size="icon"
                onClick={() => setSelectedUser(user.email)}
              >
                <QrCode />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{}</TableCell>
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
