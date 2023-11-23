"use client";
import { ViewFinder } from "@/components/ViewFinder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrReader } from "react-qr-reader";

export type IAppProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRead: (data: string) => void;
};

export function QrDialog({ open, setOpen, onRead }: IAppProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>QR</DialogTrigger> */}
      <DialogContent className="px-0">
        <DialogHeader>
          <DialogTitle>Escanee el codigo QR</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
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
          <Button onClick={() => onRead("giuliani.diego@gmail.com")}>
            Leer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
