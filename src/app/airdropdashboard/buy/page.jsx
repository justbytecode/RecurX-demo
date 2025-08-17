'use client'
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Page() {
  const [payAmount, setPayAmount] = useState('0.00');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="w-full  p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NEX Value Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">RCX value</h2>
          
          {/* Stage Progress */}
          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-800">Stage 25</span>
              <span className="text-lg font-semibold text-gray-800">1 RCX = $0.1</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3 mb-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-medium">USDT RAISED:</span>
              <span className="font-medium">$8,882,170 / $9,275,000</span>
            </div>
          </div>

        
        </div>

        {/* Buy NEX Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Buy RCX</h2>
          
          {/* You Pay */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              YOU PAY (MIN. 10$)
            </label>
            <div className="relative">
              <input
                type="text"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl text-2xl font-medium bg-gray-50"
                placeholder="0.00"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <span className="font-semibold text-gray-800">Ethereum</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0.00</span>
              <span>Balance: 0.00000 Max</span>
            </div>
          </div>

          {/* Convert Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* You Receive */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              YOU RECEIVE
            </label>
            <div className="relative">
              <div className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 text-2xl font-medium text-gray-800">
                0
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NEX</span>
                </div>
                <span className="font-semibold text-gray-800">NEX</span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold text-lg mb-8 transition-colors">
            Buy NEX
          </button>

          {/* Promo Code */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              PROMOCODE
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
              placeholder="Paste promocode"
            />
          </div>

          {/* Email Bonus */}
          <div className="bg-purple-100 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Add email and recieve 10% presale bonus!</h3>
            <div className="flex space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter email"
              />
              <button className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors">
                Send code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}