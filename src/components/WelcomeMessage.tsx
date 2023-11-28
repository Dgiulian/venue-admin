import React from "react";
import imageUrl from "./fondo.jpeg";
import BackgroundImage from "./background-image";

type Props = {
  nombre: string;
  mesa: string;
};

function WelcomeMessage({ nombre, mesa }: Props) {
  return (
    <div className="relative space-y-16 font-mono text-sm md:space-y-28 ">
      <BackgroundImage imageUrl={imageUrl} />

      {/* <p className="z-2 text-4xl uppercase md:text-7xl ">Bienvenido</p> */}
      <p className="relative top-[-25px] text-3xl font-bold uppercase md:text-6xl">
        {nombre}
      </p>

      {mesa && (
        <div className="flex flex-col items-center justify-center space-y-9">
          <p className="text-4xl font-light uppercase md:text-7xl">Mesa</p>
          <p className="text-3xl font-black uppercase md:text-6xl">{mesa}</p>
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;
