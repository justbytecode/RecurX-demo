'use client'
import React, { useState } from 'react';
import { Copy, DollarSign, Users } from 'lucide-react';

export default function Page() {
  const [referralLink] = useState('https://purchase.nexchain.ai/?r=cmefn5sss0...');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Program Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Referral Program</h2>
            
            {/* Referral Link */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-transparent text-gray-700 text-sm font-medium outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Referral Info Card */}
            <div className="bg-green-50 rounded-xl p-6 flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold text-green-700">Earn 10% USDT cashback</span> from every 
                  transaction your referrals make. Share your unique referral link and watch your 
                  earnings grow instantly.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Start Earning */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">How to Start Earning</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 mb-4 h-48 flex flex-col items-center justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>WalletConnect</span>
                        <span className="text-gray-400">INJECTED</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span>MetaMask</span>
                        <span className="text-gray-400">INJECTED</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span>Trust Wallet</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Connect Your Wallet</h3>
                <p className="text-gray-600 text-sm">
                  Securely connect your crypto wallet to activate your referral dashboard.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 mb-4 h-48 flex flex-col items-center justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-2">
                    <span className="text-xs text-gray-600 truncate">https://dashboard.nexchain.ai/?r=3gf2kl9nf7</span>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded text-xs flex items-center space-x-1">
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Share Your Unique Link</h3>
                <p className="text-gray-600 text-sm">
                  Copy your personal referral link and share it with your friends, followers, or community.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 mb-4 h-48 flex flex-col items-center justify-center">
                  <div className="bg-green-400 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">NEX</span>
                    </div>
                    <span className="text-white text-sm font-medium">You received a payment from Nexchain</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Get Paid Instantly</h3>
                <p className="text-gray-600 text-sm">
                  Earn 10% cashback per referral and convert to NEX.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Referral Earnings Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Referral Earnings</h2>
          
          {/* Available to Claim */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-600 mb-4">AVAILABLE TO CLAIM</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl font-bold text-gray-800">$0</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">MIN: $30.00</span>
            </div>
            
            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg transition-colors">
              Convert to NEX
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">ALL-TIME EARNINGS</p>
              <p className="text-2xl font-bold text-gray-800">$0</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">TOTAL REFERRALS</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}