import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="place-items: center flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 h-full  w-full max-w-5xl flex-col place-items-center items-center justify-between space-y-28 font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center space-y-9">
          <Link
            href="/reader"
            className={buttonVariants({ variant: "outline" })}
          >
            Leer QR
          </Link>

          <Link
            href="/viewer"
            className={buttonVariants({ variant: "outline" })}
          >
            Mostrar ubicaci&oacute;n
          </Link>
          {/* <Link
            href="/sorteo"
            className={buttonVariants({ variant: "outline" })}
          >
            Realizar Sorteo
          </Link> */}
          <Link href="/list" className={buttonVariants({ variant: "outline" })}>
            Ver invitados
          </Link>
        </div>
      </div>
    </main>
  );
}
