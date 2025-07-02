import { getProvider } from "../lib/ethers";
import { ethers } from "ethers";

export async function createSubscriptionPlan(amount, internalInDays, planName) {
  try {
    const contract = await getProvider();
    const amountINWei = ethers.parseUnits(amount.toString(), 18);

    const intervalInSeconds = internalInDays * 24 * 60 * 60;

    const tx = await contract.createSubscriptionPlan(
      amountINWei,
      intervalInSeconds,
      planName
    );
    await tx.wait();
    console.log(tx);
    console.log("created...");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendMatic(toAddress, amountInMatic) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const toChecksumAddress = ethers.getAddress(toAddress);

    const tx = await signer.sendTransaction({
      to: toChecksumAddress,
      value: ethers.parseEther(amountInMatic.toString()),
    });

    await tx.wait();
    console.log("Transaction hash:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    return null;
  }
}