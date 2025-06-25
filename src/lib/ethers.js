import { ethers } from "ethers";

export function getProvider() {
  return new ethers.JsonRpcProvider(process.env.MONAD_TESTNET_RPC_URL);
}