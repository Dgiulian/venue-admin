"use client";
import { ViewFinder } from "@/components/ViewFinder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrReader } from "react-qr-reader";

export type IAppProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRead: (data: string) => void;
};

export function QrDialog({ open, setOpen, onRead }: IAppProps) {
  // useEffect(() => {
  //   return () => {
  //     let stream: MediaStream | null = null;

  //     // Request the user's camera
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then((mediaStream: MediaStream) => {
  //         stream = mediaStream;
  //         // Use the stream...
  //       })
  //       .catch((error: any) => {
  //         console.error("Error accessing media devices.", error);
  //       });

  //     // Later, when you're done with the stream...
  //     closeMediaDevices(stream);
  //   };
  // }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>QR</DialogTrigger> */}
      <DialogContent className="px-0">
        <DialogHeader>
          <DialogTitle>Escanee el codigo QR</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {open && (
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  onRead(result?.getText());
                }

                if (error) {
                  console.info(error);
                }
              }}
              ViewFinder={ViewFinder}
              constraints={{
                facingMode: "environment",
              }}
              videoContainerStyle={{ width: 400, height: 400 }}
              videoStyle={{ width: "100%" }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
