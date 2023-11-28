"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactEventHandler, useState } from "react";
import QRCode from "react-qr-code";

type QRPageProps = {
  searchParams: { [key: string]: string };
};

function QRPage({ searchParams }: QRPageProps) {
  const { value } = searchParams;
  const [nombre, setNombre] = useState(value ?? "");

  const router = useRouter();

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!svg) {
      console.log("svg not found");
      return;
    }

    if (!ctx) {
      console.log("ctx not found");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/qr?value=${nombre}`);
  };

  return (
    <div className="h mt-32 flex h-screen justify-center">
      {value ? (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4">
            <QRCode id="QRCode" value={value} />
          </div>
          <Button onClick={() => onImageCownload()}>Descargar QR</Button>
          <Link href="/qr" className={buttonVariants({ variant: "outline" })}>
            Volver
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-3xl">Genere su c&oacute;digo de ingreso</p>

          <form onSubmit={handleSubmit}>
            <div className="flex max-w-md gap-4">
              <Input
                className="mr-2 flex-1"
                placeholder="Ingrese aqu&iacute; su nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Button className=" flex gap-2" type="submit">
                <QrCode />
                Generar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default QRPage;
