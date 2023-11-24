import React from "react";
import QRCode from "react-qr-code";

type QRPageProps = {
  searchParams: { [key: string]: string };
};

function QRPage({ searchParams }: QRPageProps) {
  const { email } = searchParams;
  console.log(email);

  return (
    <div className="h flex h-screen items-center justify-center">
      {email ? (
        <div className="bg-white p-4">
          <QRCode value={email} />
        </div>
      ) : (
        <p>Email no encontrado</p>
      )}
    </div>
  );
}

export default QRPage;
