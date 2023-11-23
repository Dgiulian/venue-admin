"use client";
import * as React from "react";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "@/components/ViewFinder";

export type IAppProps = {};

export default function ReaderPage(props: IAppProps) {
  const [data, setData] = React.useState("No result");

  return (
    <div className="w-width flex h-screen place-items-center items-center justify-center">
      <div className="m-x-auto max-h-md max-w-md ">
        <QrReader
          onResult={(result, error) => {
            if (result) {
              setData(result?.getText());
            }

            if (error) {
              console.info(error);
            }
          }}
          ViewFinder={ViewFinder}
          constraints={{
            // width: 1000,
            // height: 1000,
            facingMode: "environment",
            // willReadFrequently: true,
            // aspectRatio: {
            //   min: 1,
            //   max: 1,
            // },
          }}
          videoContainerStyle={{ width: 400, height: 400 }}
          videoStyle={{ width: "100%" }}
        />
        <p>{data}</p>
      </div>
    </div>
  );
}
