import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getContract } from "@/lib/contract";
import { ethers } from "ethers";
import { prisma } from "@/lib/prisma";

export default async function SubscriptionManagement() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const merchant = await prisma.merchant.findUnique({
    where: { email: session.user.email },
  });
  if (!merchant.wallet) redirect("/dashboard/wallet-integration");

  async function createSubscriptionPlan(formData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const amount = formData.get("amount");
    const interval = formData.get("interval");
    const name = formData.get("name");

    const provider = new ethers.JsonRpcProvider(process.env.MONAD_TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = getContract(wallet);

    const tx = await contract.createSubscriptionPlan(
      ethers.parseEther(amount.toString()),
      parseInt(interval) * 86400,
      name
    );
    await tx.wait();
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
          <form action={createSubscriptionPlan} className="space-y-4">
            <Input name="name" placeholder="Plan Name" required />
            <Input name="amount" type="number" placeholder="Amount (MON)" required />
            <Input name="interval" type="number" placeholder="Interval (days)" required />
            <Button type="submit">Create Plan</Button>
          </form>
        </div>
      </div>
    </div>
  );
}