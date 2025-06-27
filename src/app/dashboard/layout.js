import React from "react";
import Popups from "../../components/ui/popup";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Navbar />
          {children}
        </main>
      </div>
      <Popups />
    </div>
  );
}

export default Layout;
