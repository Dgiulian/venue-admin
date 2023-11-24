"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import QRCode from "react-qr-code";

type QRPageProps = {
  searchParams: { [key: string]: string };
};

function QRPage({ searchParams }: QRPageProps) {
  const { email } = searchParams;

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

  return (
    <div className="h flex h-screen items-center justify-center">
      {email ? (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4">
            <QRCode id="QRCode" value={email} />
          </div>
          <Button onClick={() => onImageCownload()}>Descargar QR</Button>
        </div>
      ) : (
        <p>Email no encontrado</p>
      )}
    </div>
  );
}

export default QRPage;
