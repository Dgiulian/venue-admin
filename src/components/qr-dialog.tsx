import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QrCode from "react-qr-code";

type Props = {
  open: boolean;
  value: string;
  setOpen: () => void;
};

const QRDialog = ({ open, value, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>C&oacute;digo QR </DialogTitle>
          <DialogDescription className="bg-white ">
            <span className="mt-8 flex items-center justify-center p-10">
              <QrCode value={value} />
            </span>
            <span className="text- mt-6 block text-center text-2xl font-bold">
              {value}
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QRDialog;
