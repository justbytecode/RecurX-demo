import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  connectStellarWallet,
  disconnectWalletStellar,
} from "../stellarcontract/wallet";
import { addMerchantStellar } from "../stellarcontract/index";

function ConnectStellarWallet() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkWalletConnection() {
    try {
      setLoading(true);
      const address = await connectStellarWallet();
      if (address) {
        const res = await addMerchantStellar(address);
        console.log(res);
        setWallet(address);
        setConnected(true);
      }
    } catch (error) {
      setConnected(false);
      setWallet("");
    } finally {
      setLoading(false);
    }
  }

  async function connectWallet() {
    try {
      setLoading(true);
      const address = await connectStellarWallet();
      if (address) {
        const res = await addMerchantStellar(address);
        console.log(res);
        setWallet(address);
        setConnected(true);
      }
      setWallet(address);
    } catch (error) {
      setConnected(false);
      setWallet("");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function disconnectWallet() {
    try {
      const disconnected = await disconnectWalletStellar();
      setConnected(false);
      setWallet("");
    } catch (error) {
      console.log(error);
      setConnected(true);
      setWallet(wallet);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Connected Wallet Section */}
      {connected && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    className="w-10 h-10"
                    src={
                      "https://developers.stellar.org/img/docusaurus/stellar-logo.svg"
                    }
                    alt="stellar"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Stellar Wallet
                  </div>
                  <div className="text-sm text-gray-500">
                    Wallet connected successfully
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  Connected
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Section */}
      <div>
        {!connected && (
          <Button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ConnectStellarWallet;
