import { ethers } from "ethers";
import { useWalletClient } from "wagmi";

const PUBLIC_SALE_ADDRESS = "0x675Dae3cBdf311878dF75e04e802e9A8F24073b2";
const CHAINLINK_FEED_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // native/USD feed on Ethereum mainnet
import PublicSaleABI from "../abis/publicSales.json";

export async function handleBuy(walletClient,amount) {
  
    console.log("called buy")

  if (!amount || isNaN(amount) || Number(amount) <= 0)
    return alert("Enter a valid RCX amount");

  const provider = new ethers.BrowserProvider(walletClient.transport);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    PUBLIC_SALE_ADDRESS,
    PublicSaleABI,
    signer
  );
  console.log(signer)
  try {
    const rcxAmount18 = ethers.parseUnits(amount, 18);
    const nativeValue = await contract.nativeCost(rcxAmount18);
    if (nativeValue === 0n) {
      alert("Calculated native cost is zero. Price feed might be stale.");
      return;
    }

    const tx = await contract.buyWithNative(rcxAmount18, {
      value: nativeValue,
    });

    await tx.wait();
    console.log(tx)

    alert("Tokens purchased successfully!");
  } catch (err) {
    console.error("Buy failed:", err);
    alert("Error: " + (err?.message ?? "Transaction failed"));
  } finally {
  }
}

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    const newProvider = new ethers.BrowserProvider(window.ethereum);
    await newProvider.send("eth_requestAccounts", []);
    const newSigner = await newProvider.getSigner();
    const userAddress = await newSigner.getAddress();

    setProvider(newProvider);
    setSigner(newSigner);
    setAddress(userAddress);

    const saleContract = new ethers.Contract(
      PUBLIC_SALE_ADDRESS,
      PublicSaleABI,
      newSigner
    );
    setContract(saleContract);
  } catch (err) {
    console.error("Connection error:", err);
    alert("Connection failed: " + (err.message || err));
  }
}

