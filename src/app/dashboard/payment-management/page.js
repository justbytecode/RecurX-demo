import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PaymentManagement() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const merchant = await prisma.merchant.findUnique({
    where: { email: session.user.email },
  });
  if (!merchant.wallet) redirect("/dashboard/wallet-integration");

  const transactions = await prisma.transaction.findMany({
    where: { merchant: { email: session.user.email } },
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount (MON)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.createdAt.toISOString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}