"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";

export default function RecieveTokens() {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);
  const { authenticated, user } = usePrivy();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  if (!authenticated) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button variant="ghost"disabled>
            Connect the wallet
          </Button>
        </div>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <QrCode className="h-4 w-4" />
          Show QR
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm flex flex-col items-center gap-4">
        <DialogHeader>
          <DialogTitle>Wallet QR Code</DialogTitle>
        </DialogHeader>

        <QRCodeCanvas value={user.wallet.address} size={200} includeMargin />

        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{`${user.wallet.address.slice(
            0,
            6
          )}...${user.wallet.address.slice(-4)}`}</span>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
