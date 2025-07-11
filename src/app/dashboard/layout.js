"use client";
import React from "react";
import Popups from "../../components/ui/popup";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/themeContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { MessageCircleWarning } from "lucide-react";

function Layout({ children }) {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${themeClasses.background}  ${themeClasses.textPrimary} ${themeClasses.textMuted}`}
    >
      

      <div className="flex flex-1 flex-row">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Navbar />
          <TonConnectUIProvider manifestUrl="https://localhost:3000/tonconnect-manifest.json">
            {children}
          </TonConnectUIProvider>
        </main>
      </div>
      <Popups />
    </div>
  );
}

export default Layout;
