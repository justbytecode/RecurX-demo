import { useState } from "react";
import { getWallets } from "@massalabs/wallet-provider";
import { Button } from "../components/ui/button";


function MassaWallet() {
  const [account, setAccount] = useState(null);
  async function connectWallet() {
    try {
      const wallets = await getWallets();
      if (!wallets || wallets.length === 0) {
        alert(
          "No Massa wallet provider found. Make sure Massa Station or Massa Snap is installed."
        );
        return;
      }
      const myWallet = wallets[0];
      const accounts = await myWallet.accounts();
      if (accounts.length === 0) {
        alert("No accounts found in the wallet.");
        return;
      }
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Wallet connection error", err);
      alert("Failed to connect to Massa wallet. Check console for details.");
    }
  }

  return (
    <>
      <Button onClick={connectWallet}>Connect Massa Wallet</Button>
      <div>
        {JSON.stringify(account)}
      </div>
    </>
  );
}

export default MassaWallet;
