"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "../../../context/themeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import {
  User,
  Palette,
  Link,
  Wallet,
  Moon,
  Sun,
  Settings,
  ChevronRight,
  Copy,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
// import { TonConnectButton } from "@tonconnect/ui-react";
import MassaWallet from "../../../massawallet/index"


export default function UserProfile() {
  const { data: session, status } = useSession();
  const { authenticated, user } = usePrivy();
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [connectedWallet, setConnectedWallet] = useState(null);

  useEffect(() => {
    if (authenticated && user?.wallet?.walletClientType) {
      setConnectedWallet(user.wallet.walletClientType);
    }
  }, [authenticated, user]);

  // Loading state
  if (status === "loading") {
    return (
      <div
        className={`min-h-screen ${themeClasses.background} flex items-center justify-center`}
      >
        <div className={`flex items-center gap-2 ${themeClasses.textPrimary}`}>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (status === "unauthenticated" || !session) {
    return (
      <div
        className={`min-h-screen ${themeClasses.background} flex items-center justify-center`}
      >
        <Card
          className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} max-w-md`}
        >
          <CardHeader className="text-center">
            <CardTitle className={themeClasses.textPrimary}>
              Authentication Required
            </CardTitle>
            <CardDescription className={themeClasses.textSecondary}>
              Please sign in to access your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInfo = {
    name: session.user?.name || "Unknown User",
    email: session.user?.email || "No email provided",
    image: session.user?.image || null,
    address: user?.wallet?.address,
    balance: session.user?.balance || "0.00 ETH",
    joinDate: session.user?.createdAt
      ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "Recently",
    provider: session.user?.provider || "Unknown",
    verified: session.user?.emailVerified ? true : false,
  };

  const chains = [
    { id: "ethereum", name: "Ethereum", icon: "⟠", color: "bg-blue-500" },
    { id: "polygon", name: "Polygon", icon: "⬟", color: "bg-purple-500" },
    { id: "bsc", name: "BSC", icon: "◊", color: "bg-yellow-500" },
    { id: "arbitrum", name: "Arbitrum", icon: "◈", color: "bg-cyan-500" },
    { id: "optimism", name: "Optimism", icon: "○", color: "bg-red-500" },
  ];

  const wallets = [
    { id: "metamask", name: "MetaMask", icon: "🦊" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🟦" },
    { id: "phantom", name: "Phantom", icon: "👻" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  // const switchWallets = async () => {
  //   if (!authenticated) return;

  //   try {
  //     const currentAddress = user?.wallet?.address;
  //     const numAccounts = user?.linkedAccounts?.length || 0;

  //     if (currentAddress && numAccounts > 1) {
  //       await unlinkWallet(currentAddress);
  //     }
  //     await linkWallet();

  //     const updatedUser = await getUser(); // ✅ fetch fresh user data
  //     const newAddress = updatedUser?.wallet?.address;

  //     if (newAddress) {
  //       await fetch("/api/switchwallet", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           walletAddress: newAddress,
  //         }),
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error switching wallet:", error);
  //   }
  // };
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.textPrimary}`}
    >
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {userInfo.name.split(" ")[0]}
            </h1>
            <p className={themeClasses.textMuted}>
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Information Card */}
          <Card
            className={`lg:col-span-2 ${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userInfo.image} alt={userInfo.name} />
                  <AvatarFallback className="bg-purple-600 text-white text-xl">
                    {getInitials(userInfo.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle
                    className={`flex items-center gap-2 ${themeClasses.textPrimary}`}
                  >
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className={themeClasses.textSecondary}>
                    Your account details and wallet information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    className={`text-sm font-medium ${themeClasses.textMuted}`}
                  >
                    Name
                  </Label>
                  <p
                    className={`text-lg font-semibold ${themeClasses.textPrimary}`}
                  >
                    {userInfo.name}
                  </p>
                </div>
                <div>
                  <Label
                    className={`text-sm font-medium ${themeClasses.textMuted}`}
                  >
                    Email
                  </Label>
                  <p className={`text-lg ${themeClasses.textPrimary}`}>
                    {userInfo.email}
                  </p>
                </div>
                <div>
                  <Label
                    className={`text-sm font-medium ${themeClasses.textMuted}`}
                  >
                    Wallet Address
                  </Label>
                  <div className="flex items-center gap-2">
                    <code
                      className={`text-sm px-2 py-1 rounded ${themeClasses.code}`}
                    >
                      {userInfo.address}...
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(userInfo.address)}
                      className={`h-8 w-8 p-0 ${themeClasses.hover} ${themeClasses.textSecondary}`}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Separator
                className={`my-4 ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-200"
                }`}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-sm ${themeClasses.textMuted}`}>
                    Member since {userInfo.joinDate}
                  </span>
                  {session.user?.provider && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${themeClasses.border} ${themeClasses.textSecondary}`}
                    >
                      via {session.user.provider}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {userInfo.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-600 text-white"
                    >
                      Email Verified
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-purple-600 text-white"
                  >
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card
            className={`${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 ${themeClasses.textPrimary}`}
              >
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className={`w-full justify-between ${themeClasses.border} ${themeClasses.textSecondary} ${themeClasses.hover}`}
              >
                View Transactions
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-between ${themeClasses.border} ${themeClasses.textSecondary} ${themeClasses.hover}`}
              >
                Security Settings
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card
            className={`${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 ${themeClasses.textPrimary}`}
              >
                <Palette className="w-5 h-5" />
                Theme Settings
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Customize your interface appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  ) : (
                    <Sun className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  )}
                  <Label
                    htmlFor="theme-toggle"
                    className={themeClasses.textPrimary}
                  >
                    Dark Mode
                  </Label>
                </div>
                <Switch
                  id="theme-toggle"
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Chain Selection */}
          <Card
            className={`${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 ${themeClasses.textPrimary}`}
              >
                <Link className="w-5 h-5" />
                Blockchain Networks
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Select your preferred blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger className={`w-full ${themeClasses.input}`}>
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent
                  className={`${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
                >
                  {chains.map((chain) => (
                    <SelectItem
                      key={chain.id}
                      value={chain.id}
                      className={`${themeClasses.textPrimary} ${themeClasses.hover}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${chain.color} flex items-center justify-center text-xs`}
                        >
                          {chain.icon}
                        </div>
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Wallet Management */}
          <Card
            className={`${themeClasses.cardBackground} ${themeClasses.cardBorder}`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 ${themeClasses.textPrimary}`}
              >
                <Wallet className="w-5 h-5" />
                Wallet Management
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Connect and manage your crypto wallets
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Connected Wallet */}
              <div className="space-y-2">
                <Label
                  className={`text-sm font-medium ${themeClasses.textPrimary}`}
                >
                  Connected Wallet
                </Label>
                {authenticated ? (
                  <div
                    className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                      themeClasses.border
                    } ${isDarkMode ? "bg-slate-800" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {wallets.find((w) => w.id === connectedWallet)?.icon}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`font-semibold text-base ${themeClasses.textPrimary}`}
                          >
                            {
                              wallets.find((w) => w.id === connectedWallet)
                                ?.name
                            }
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Wallet connected successfully
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                        Connected
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-xl border-dashed border-2 text-center text-muted-foreground ${
                      themeClasses.border
                    } ${isDarkMode ? "bg-slate-800" : "bg-slate-50"}`}
                  >
                    <p className="text-sm">
                      🔌 Connect your wallet to continue
                    </p>
                  </div>
                )}
              </div>

              {/* TON Wallet */}
              {/* <div className="space-y-2">
                <Label
                  className={`text-sm font-medium ${themeClasses.textPrimary}`}
                >
                  Connect TON Wallet
                </Label>
                <TonConnectButton />
              </div> */}

              {/* Massa Wallet */}
              <div className="space-y-2">
                <Label
                  className={`text-sm font-medium ${themeClasses.textPrimary}`}
                >
                  Connect Massa Wallet
                </Label>
                <MassaWallet/>
              </div>

              <Button
                variant="outline"
                className="w-full border-purple-500 text-purple-400 hover:bg-purple-600/20"
              >
                Connect New Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
