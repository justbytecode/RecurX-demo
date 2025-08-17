'use client'
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

export default function AirDropNavbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Wallet Status */}
        <div className="flex items-center space-x-3">
          {!isConnected ? (
            <>
              <span className="text-gray-600 font-medium">No wallet connection</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-800 font-medium">Connected: {walletAddress}</span>
            </>
          )}
        </div>

        {/* Connect/Disconnect Button */}
        {!isConnected ? (
          <button
            onClick={handleConnectWallet}
            className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}