import WelcomeMessage from "@/components/WelcomeMessage";
import { NextPage } from "next";
import Image from "next/image";

export default function ViewerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { nombre = "Juan Perez", mesa = "12" } = searchParams;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      {/* <div className="z-10 h-full  w-full max-w-5xl flex-col place-items-center items-center justify-between space-y-28 font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center space-y-9">
          <p className="text-7xl uppercase ">Bienvenido</p>
          <p className="text-6xl">Jorge Nitales</p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-9">
          <p className="text-7xl uppercase">Mesa</p>
          <p className="text-6xl">24</p>
        </div>
      </div> */}
      <WelcomeMessage nombre={nombre} mesa={mesa} />
    </main>
  );
}
