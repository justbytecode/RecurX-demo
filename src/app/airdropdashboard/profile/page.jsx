'use client'
import React, { useState } from 'react';
import { ChevronDown, DollarSign, RefreshCw, Users, Settings } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [xUsername, setXUsername] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Profile Info Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your profile info</h2>
          
          {/* Email Bonus Section */}
          <div className="bg-purple-100 rounded-xl p-4 mb-6">
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

          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
              placeholder=""
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Phone Number
            </label>
            <div className="flex space-x-3">
              <div className="relative">
                <button className="flex items-center space-x-2 p-4 border border-gray-300 rounded-xl bg-gray-50 min-w-[120px]">
                  <span className="text-lg">🇨🇦</span>
                  <span className="font-medium">{countryCode}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 p-4 border border-gray-300 rounded-xl bg-gray-50"
                placeholder=""
              />
            </div>
          </div>

          {/* Social Media Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* X (Twitter) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                X (Twitter)
              </label>
              <input
                type="text"
                value={xUsername}
                onChange={(e) => setXUsername(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                placeholder="X username"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Telegram
              </label>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                placeholder="Telegram username"
              />
            </div>
          </div>
        </div>

        {/* Your Balance Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your balance</h2>
          
          {/* Balance Stats Grid */}
          <div className="space-y-6">
            {/* Current Worth */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">CURRENT WORTH</p>
                <p className="text-2xl font-bold text-gray-800">$0.00</p>
              </div>
            </div>

            {/* Invested */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">INVESTED</p>
                <p className="text-2xl font-bold text-gray-800">$0.00</p>
              </div>
            </div>

            {/* NEX Owned and ROI */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">RCX OWNED</p>
                  <p className="text-lg font-bold text-gray-800">0 RCX</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">ROI</p>
                  <p className="text-lg font-bold text-gray-800">0.00%</p>
                </div>
              </div>
            </div>

            {/* Referral Earnings and Total Referrals */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">REFERRAL EARNINGS</p>
                  <p className="text-lg font-bold text-gray-800">$0.00</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">TOTAL REFERRALS</p>
                  <p className="text-lg font-bold text-gray-800">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}