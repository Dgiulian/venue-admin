import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
          <DialogDescription>
            <span className="mt-8 flex items-center justify-center">
              <QrCode value={value} />
            </span>
            <p className="mt-6 text-center text-2xl font-bold text-white">
              {value}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QRDialog;
