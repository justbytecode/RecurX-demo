import React from "react";
import AirDropSideBar from "../../components/component/sidebar-airdrop";
import AirDropNavbar from "../../components/component/navbar-airdrop";
import WalletConnect from "../../context/walletConnectContext";

function layout({ children }) {
  return (
    <WalletConnect>
      <main className="flex">
        <AirDropSideBar />
        <section className="w-full">
          <AirDropNavbar />
          {children}
        </section>
      </main>
    </WalletConnect>
  );
}

export default layout;
