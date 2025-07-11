import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";

export const connectStellarWallet = async () => {
  const connect = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });

  const WALLET_ADDRESS = await new Promise((resolve, reject) => {
    connect.openModal({
      onWalletSelected: async (option) => {
        await connect.setWallet(option.id);
        const { address } = await connect.getAddress();
        if (address) {
          resolve(address);
        } else {
          reject("Error");
        }
      },
    });
  });

  return WALLET_ADDRESS;
};

export const disconnectWalletStellar = async () => {
  try {
    const connect = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: XBULL_ID,
      modules: allowAllModules(),
    });
    await connect.disconnect();
    return true;
  } catch (error) {
    console.log(error);
  }
};
