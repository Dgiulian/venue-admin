"use client";

import WelcomeMessage from "@/components/WelcomeMessage";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ViewerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  // const { nombre = "Juan Perez", mesa = "12" } = searchParams;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch("/users/ultimo", {
          signal: abortController.signal,
        });
        if (response.ok) {
          const data = await response.json();
          // Process the fetched data here
          // console.log("Fetched data:", data);
          if (data.users) {
            setUser(data.users as User);
          } else {
            setUser(null);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 1500);

    // Clean up interval on component unmount
    return () => {
      window.clearInterval(intervalId);
      console.log("Aborting fetch");
      abortController.abort();
    };
  }, []);

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     fetch("/users/ultimo")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res.users);

  //       });
  //   }, 1500);

  //   return () => {
  //     // console.log(interval);
  //     // clearInterval(interval);
  //   };
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      {user ? (
        <WelcomeMessage
          nombre={`${user?.firstName} ${user?.lastName}`}
          mesa={`${user?.mesa}`}
        />
      ) : (
        <div>
          <h1 className="text-5xl uppercase md:text-8xl">Bienvenidos</h1>
        </div>
      )}
    </main>
  );
}
