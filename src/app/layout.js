import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar copy";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "../components/ui/toast";
// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import FaviconSwitcher from "../components/FaviconSwitcher";
// import { icons } from "lucide-react";
import PrivyContext from "../context/privyContext";
import { Providers } from "../context/sessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecurX",
  description: "A Decentralized Subscription Payment Gateway",
  icons: {
    icon: "/favicon/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <FaviconSwitcher />
        <ToastProvider>
          <ToastContainer />
          <ToastContainer />
          {!session && <Navbar />}
          <Providers>
            <PrivyContext>{children}</PrivyContext>
          </Providers>
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          {!session && <Footer />}
        </ToastProvider>
      </body>
    </html>
  );
}
