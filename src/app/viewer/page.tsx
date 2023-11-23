import Image from "next/image";

export default function ViewerPage() {
  return (
    <main className="place-items: center flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 h-full  w-full max-w-5xl flex-col place-items-center items-center justify-between space-y-28 font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center space-y-9">
          <p className="text-7xl uppercase ">Bienvenido</p>
          <p className="text-6xl">Jorge Nitales</p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-9">
          <p className="text-7xl uppercase">Mesa</p>
          <p className="text-6xl">24</p>
        </div>
      </div>
    </main>
  );
}
