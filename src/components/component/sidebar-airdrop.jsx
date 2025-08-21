"use client";
import React, { useState } from "react";
import {
  LayoutGrid,
  ShoppingCart,
  Link2,
  BarChart3,
  History,
  User,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function AirDropSidebar() {
  const [activeItem, setActiveItem] = useState("Overview");

  const menuItems = [
    {
      name: "Overview",
      icon: LayoutGrid,
      active: true,
      link: "/airdropdashboard",
    },
    { name: "Buy RCX", icon: ShoppingCart, link: "/airdropdashboard/buy" },
    { name: "Referrals", icon: Link2, link: "/airdropdashboard/referral" },
    {
      name: "Leaderboard",
      icon: BarChart3,
      link: "/airdropdashboard/leaderbord",
    },
    { name: "My Transactions", icon: History, link: "/" },
    { name: "Profile", icon: User, link: "/airdropdashboard/profile" },
  ];

  const bottomMenuItems = [
    { name: "Airdrop", icon: Zap, badge: "New" },
    { name: "Back To Website", icon: ArrowLeft },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Recurx</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <Link href={item.link}>
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-6 border-t border-gray-100">
        <div className="space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
