import { useEffect, useState } from "react";
import { getWallets } from "@massalabs/wallet-provider";
import { Button } from "../components/ui/button";
import { ClipboardCopyIcon, CheckIcon } from "lucide-react"; // optional: Heroicons
import { Badge } from "../components/ui/badge";

function MassaWallet() {
  const [account, setAccount] = useState(null);
  const [copied, setCopied] = useState(false);

  // ✅ Auto-load account on mount
  useEffect(() => {
    connectWallet(true);
  }, []);

  // 📋 Copy function
  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 🔌 Connect Wallet
  async function connectWallet(isSilent = false) {
    try {
      const wallets = await getWallets();
      if (!wallets || wallets.length === 0) {
        if (!isSilent) {
          alert(
            "No Massa wallet provider found. Make sure Massa Station or Massa Snap is installed."
          );
        }
        return;
      }

      const myWallet = wallets[0];
      const accounts = await myWallet.accounts();
      if (accounts.length === 0) {
        alert("No accounts found in the wallet.");
        return;
      }

      setAccount(accounts[0]);

      // 🧩 Open Massa Station / Bearly Wallet on connect
      if (!isSilent && typeof window !== "undefined") {
        window.open("https://www.massa.net/wallet", "_blank");
      }
    } catch (err) {
      console.error("Wallet connection error", err);
      if (!isSilent) {
        alert("Failed to connect to Massa wallet. Check console for details.");
      }
    }
  }

  return (
    <div className="flex flex-col border rounded-xl p-4 w-fit mx-auto mt-10 bg-white">
      {account ? (
        <div className="text-center space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm border">
            <img
              className="h-6 w-6"
              src="https://docs.massa.net/img/massa_logo.svg"
              alt="Massa Logo"
            />
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              Massa Wallet
              <Badge variant="success">Connected</Badge>
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
            <span className="text-sm text-gray-700 font-mono">
              {account.address.slice(0, 30)}
            </span>
            <button
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-700"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardCopyIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <Button onClick={() => connectWallet(false)}>
          🔌 Connect Massa Wallet
        </Button>
      )}
    </div>
  );
}

export default MassaWallet;
