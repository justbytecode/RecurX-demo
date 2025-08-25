"use client";
import React from "react";
import WalletConnector from "./wallet-connect";

export default function AirDropNavbar() {
  return (
    <div className="w-full bg-white py-5 px-3">
      <div className="flex items-center justify-end">
          <WalletConnector />
      </div>
    </div>
  );
}
