"use client";
import { Button } from "../components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "./ui/card";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { login, authenticated, user, logout } = usePrivy();
  const [points, setPoints] = useState("0");
  const [shouldAddWallet, setShouldAddWallet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Controls profile dropdown

  const fetchPoints = async () => {
    try {
      const res = await fetch("/api/connectwallet", {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch points");

      const data = await res.json();
      setPoints(data.message || "0");
    } catch (error) {
      console.error("Error fetching points:", error);
      setPoints("0");
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const addWallet = async () => {
    await login();
    setShouldAddWallet(true);
  };

  useEffect(() => {
    const sendWallet = async () => {
      if (shouldAddWallet && user?.wallet?.address) {
        try {
          const res = await fetch("/api/addwallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wallet: user.wallet.address }),
          });

          if (!res.ok) {
            console.error("Failed to add wallet");
          } else {
            fetchPoints();
          }
        } catch (error) {
          console.error("Error sending wallet:", error);
        } finally {
          setShouldAddWallet(false);
        }
      }
    };

    sendWallet();
  }, [shouldAddWallet, user?.wallet?.address]);

  // State for copy feedback
  const [copySuccess, setCopySuccess] = useState(false);

  // Copy wallet address to clipboard
  const copyToClipboard = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Generate a simple avatar based on wallet address as fallback
  const generateAvatar = (address) => {
    if (!address) return null;
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
    ];
    const colorIndex = parseInt(address.slice(2, 4), 16) % colors.length;
    const initials = address.slice(2, 4).toUpperCase();

    return (
      <div
        className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm`}
      >
        {initials}
      </div>
    );
  };

  // Render user profile image or fallback avatar
  const renderProfileImage = () => {
    if (session?.user?.image) {
      return (
        <img
          src={session.user.image}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
        />
      );
    }
    return generateAvatar(user?.wallet?.address);
  };

  return (
    <nav className="p-4 bg-slate-900 text-white flex justify-between py-10 px-6 mt-16">
      <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
      <div>
        {authenticated ? (
          <div className="flex flex-row items-center justify-center gap-10 relative">
            <div>Your Points: {points}</div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {renderProfileImage()}
              </button>

              {showDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-white text-black rounded-lg shadow-lg p-4 z-50 min-w-64">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    {renderProfileImage()}
                    <div>
                      <div className="font-semibold text-sm">
                        {session?.user?.name || "Wallet Connected"}
                      </div>
                      <div className="text-xs text-gray-600">
                        {user?.wallet?.address?.slice(0, 6)}...
                        {user?.wallet?.address?.slice(-4)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Full Address:
                    </div>
                    <div className="relative">
                      <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all pr-10">
                        {user?.wallet?.address}
                      </div>
                      <button
                        onClick={() => copyToClipboard(user?.wallet?.address)}
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy address"
                      >
                        {copySuccess ? (
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {copySuccess && (
                      <div className="text-xs text-green-600 mt-1">
                        Address copied!
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-10 items-center justify-center">
            <Card>
              <CardContent>Your Points: {points}</CardContent>
            </Card>
            <Button
              onClick={addWallet}
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={authenticated}
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
