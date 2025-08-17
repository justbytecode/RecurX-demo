"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Page() {
  const [payAmount, setPayAmount] = useState("0.00");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">$</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">INVESTED</p>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full">
              <div className="w-full h-full bg-purple-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">RCX OWNED</p>
            <p className="text-xl font-bold">0 RCX</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💎</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">CURRENT RCX WORTH</p>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚙️</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">REFERRAL EARNINGS</p>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NEX Value Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">RCX value</h2>

          {/* Stage Progress */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Stage 25</span>
              <span className="text-lg font-semibold">1 RCX = $0.1</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>USDT RAISED:</span>
              <span>$8,882,160 / $9,275,000</span>
            </div>
          </div>
        </div>

        {/* Buy NEX Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Buy NEX</h2>

          {/* You Pay */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YOU PAY (MIN. 10$)
            </label>
            <div className="relative">
              <input
                type="text"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                placeholder="0.00"
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Ethereum</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0.00</span>
              <span>Balance: 0.00000 Max</span>
            </div>
          </div>

          {/* Convert Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* You Receive */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YOU RECEIVE
            </label>
            <div className="relative">
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-lg">
                0
              </div>
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                <span className="font-medium">NEX</span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold mb-6">
            Buy NEX
          </button>

          {/* Promo Code */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PROMOCODE
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Paste promocode"
            />
          </div>

          {/* Email Bonus */}
          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">
              Add email and recieve 10% presale bonus!
            </h3>
            <div className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter email"
              />
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                Send code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
