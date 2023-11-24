"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { PartyPopper } from "lucide-react";
import { useState } from "react";

type Props = { users: User[] };

const Sorteo = ({ users }: Props) => {
  const [winner, setWinner] = useState<User | null>(null);

  const handleSorteo = () => {
    const registeredUsers = users.filter((user) => user.register);
    const winner = getRandomItem(registeredUsers);

    if (winner) {
      setWinner(winner);
    }
  };

  const dialogText = `${winner?.firstName} ${winner?.lastName} es el ganador`;

  return (
    <div>
      <Button variant="outline" onClick={handleSorteo}>
        <PartyPopper className="mr-2 h-4 w-4" />
        Sorteo
      </Button>

      <AlertDialog open={!!winner}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Felicitaciones!</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-200">
              {dialogText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setWinner(null)}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sorteo;
