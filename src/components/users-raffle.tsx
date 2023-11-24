"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { User } from "@/lib/types";
import { getRandomInt } from "@/lib/utils";
import { PartyPopper } from "lucide-react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

type Props<T> = {
  items: T[];
  debug?: boolean;
};

function UsersRaffle({ items, debug = false }: Props<User>) {
  const [index, setIndex] = useState<number | null>(null);
  const [winner, setWinner] = useState<User | null>(null);
  const [start, setStart] = useState(false);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    if (!start) {
      if (index !== null) {
        setWinner(items[index]);
      }

      return;
    }
    const interval = setInterval(() => {
      if (!start) {
        if (index !== null) {
          console.log(items[index]);
          setWinner(items[index]);
        }
        clearInterval(interval);
        return;
      }
      setIndex(getRandomInt(0, items.length - 1));

      // setIndex((index) => {
      //   if (index === items.length - 1) {
      //     return 0;
      //   }
      //   return index + 1;
      // });
    }, 200);
    return () => window.clearInterval(interval);
  }, [start, items]);

  const startRaffle = () => {
    setStart(true);
    setWinner(null);
    setIndex(getRandomInt(0, items.length - 1));
    setTimeout(() => {
      setStart(false);
    }, 2000);
  };

  const resetRaffle = () => {
    setStart(false);
    setWinner(null);
    setIndex(null);
  };

  if (!items) {
    return;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-16">
      {winner ? (
        <div>
          <p className="mb-12 text-center  text-6xl uppercase">Ganador!!</p>
          <p className="text-6xl uppercase">{winner.fullName}</p>
          <Confetti width={width} height={height} />
        </div>
      ) : (
        <>
          {start && index !== null && (
            <p className="text-6xl uppercase">{items[index].fullName}</p>
          )}
          {debug && start && <p className="text-xs uppercase">{index}</p>}
        </>
      )}
      <div className="flex gap-4">
        <Button onClick={startRaffle} disabled={start}>
          <PartyPopper className="mr-4" />
          Iniciar
        </Button>
        {winner && (
          <Button onClick={resetRaffle} disabled={start}>
            Resetear
          </Button>
        )}
      </div>
    </div>
  );
}

export default UsersRaffle;
