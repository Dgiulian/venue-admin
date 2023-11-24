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
import { Check, X } from "lucide-react";

type GuestTableProps = {
  users: User[];
};

export function GuestTable({ users }: GuestTableProps) {
  return (
    <Table>
      <TableCaption>Lista de invitados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Nombre</TableHead>
          <TableHead>Mesa</TableHead>
          <TableHead className="hidden md:block">Email</TableHead>
          <TableHead>Registrado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.mesa}</TableCell>
            <TableCell className="hidden md:block">{user.email}</TableCell>
            <TableCell className="w-10">
              {user.register ? (
                <Check className="text-green-500" />
              ) : (
                <X className=" text-red-400" />
              )}
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
    </Table>
  );
}
