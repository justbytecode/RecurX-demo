import React from "react";
import AirDropSideBar from "../../components/component/sidebar-airdrop";
import AirDropNavbar from "../../components/component/navbar-airdrop";

function layout({ children }) {
  return (
    <main className="flex">
      <AirDropSideBar />
      <section className="w-full">
        <AirDropNavbar />
        {children}
      </section>
    </main>
  );
}

export default layout;
