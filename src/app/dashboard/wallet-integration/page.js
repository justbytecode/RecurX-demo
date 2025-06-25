import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { usePrivy } from "@privy.io/react-auth";
import { prisma } from "@/lib/prisma";

export default async function WalletIntegration() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  async function connectWallet(walletAddress) {
    "use server";
    await prisma.merchant.update({
      where: { email: session.user.email },
      data: { wallet: walletAddress },
    });
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Wallet Integration</h1>
          <ConnectWalletButton connectWallet={connectWallet} />
        </div>
      </div>
    </div>
  );
}