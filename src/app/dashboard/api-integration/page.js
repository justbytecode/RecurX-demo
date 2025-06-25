// import { Button } from "../../../components/ui/button";
// import Sidebar from "../../../components/Sidebar";
// import Navbar from "../../../components/Navbar";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import { prisma } from "../../../lib/prisma";

// // Server action must be outside the component
// export async function generateApiKey() {
//     "use server";
//     const session = await getServerSession(authOptions);
//     if (!session) throw new Error("Unauthorized");

//     const { randomBytes } = await import("crypto");
//     const apiKey = randomBytes(32).toString("hex");
//     const clientId = randomBytes(16).toString("hex");
//     const clientSecret = randomBytes(32).toString("hex");

//     await prisma.apiKey.create({
//         data: {
//             key: apiKey,
//             clientId,
//             clientSecret,
//             merchant: { connect: { email: session.user.email } },
//         },
//     });
// }

// export default async function ApiIntegration() {
//     const session = await getServerSession(authOptions);
//     if (!session) redirect("/sign-in");

//     const merchant = await prisma.merchant.findUnique({
//         where: { email: session.user.email },
//     });
//     if (!merchant || !merchant.wallet) redirect("/dashboard/wallet-integration");

//     const apiKeys = await prisma.apiKey.findMany({
//         where: { merchant: { email: session.user.email } },
//     });

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex-1">
//                 <Navbar />
//                 <div className="p-8">
//                     <h1 className="text-2xl font-bold mb-4">API Integration</h1>
//                     <form action={generateApiKey}>
//                         <Button type="submit">Generate API Key</Button>
//                     </form>
//                     <div className="mt-4">
//                         <h2 className="text-lg font-semibold">Your API Keys</h2>
//                         {apiKeys.map((key) => (
//                             <div key={key.id || key.key} className="p-4 bg-gray-100 rounded my-2">
//                                 <p>Client ID: {key.clientId}</p>
//                                 <p>Client Secret: {key.clientSecret}</p>
//                                 <p>API Key: {key.key}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-4">
//                         <h2 className="text-lg font-semibold">API Documentation</h2>
//                         <p>POST /api/payment-links - Create a payment link</p>
//                         <p>POST /api/subscriptions - Create a subscription</p>
//                         <p>Example:</p>
//                         <pre>
//                             <code>{`fetch('/api/payment-links', {
//     method: 'POST',
//     headers: {
//         'Authorization': 'Bearer YOUR_API_KEY',
//         'Client-Id': 'YOUR_CLIENT_ID',
//         'Client-Secret': 'YOUR_CLIENT_SECRET',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ amount: 10, description: 'Test Payment' }),
// });`}</code>
//                         </pre>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React from 'react'

function page() {
  return (
    <div>
      
    </div>
  )
}

export default page
