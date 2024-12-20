"use client";

import React, { useRef, useState } from "react";
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

const ANIMATION_SPEED = 80;
const ANIMATION_DURATION = 2000;

function markWinner(user: User) {
  fetch(`register/${user.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      register: 0,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`${user.fullName} marcado como ganador. Id: ${user.id}`);
    });
}

function UsersRaffle({ items, debug = false }: Props<User>) {
  const [index, setIndex] = useState<number | null>(null);
  const [winner, setWinner] = useState<User | null>(null);
  const previousWinners = useRef<number[]>([]);
  const [start, setStart] = useState(false);
  const { width, height } = useWindowSize();

  // console.log(
  //   `${items.length} invitados para el sorteo. ${previousWinners.current.length} ya ganadores`,
  // );

  React.useEffect(() => {
    if (!start) {
      if (index !== null) {
        console.log(items[index]);
        const newWinner = items[index];
        setWinner(newWinner);
        previousWinners.current.push(index);
        markWinner(newWinner);
      }

      return;
    }
    const interval = setInterval(() => {
      if (!start) {
        if (index !== null) {
          console.log(items[index]);
          const newWinner = items[index];
          setWinner(newWinner);
          previousWinners.current.push(index);
          markWinner(newWinner);
        }
        clearInterval(interval);
        return;
      }

      let newIndex = getRandomInt(0, items.length - 1);

      while (
        previousWinners.current.length < items.length &&
        previousWinners.current.includes(newIndex)
      ) {
        newIndex = getRandomInt(0, items.length - 1);
      }

      setIndex(newIndex);
    }, ANIMATION_SPEED);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, items]);

  const startRaffle = () => {
    setStart(true);
    setWinner(null);
    setIndex(getRandomInt(0, items.length - 1));
    setTimeout(() => {
      setStart(false);
    }, ANIMATION_DURATION);
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
          <p className="mb-12 text-center  text-2xl uppercase lg:text-6xl">
            Ganador!!
          </p>
          <p className="text-center text-xl uppercase lg:text-6xl">
            {winner.fullName}
          </p>
          <Confetti width={width} height={height} />
        </div>
      ) : (
        <>
          {start && index !== null && (
            <p className="text-xl uppercase lg:text-6xl">
              {items[index].fullName}
            </p>
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
