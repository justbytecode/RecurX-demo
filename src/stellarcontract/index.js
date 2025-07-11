import {
  Address,
  Contract,
  Keypair,
  Networks,
  TransactionBuilder,
  nativeToScVal,
  BASE_FEE,
  StrKey,
  rpc,
} from "@stellar/stellar-sdk";

const server = new rpc.Server("https://rpc-futurenet.stellar.org");
const networkPassphrase = Networks.FUTURENET;

const userKeypair = Keypair.fromSecret(
  "SDV3RUFFVGAITP6UIS2B6QBLXWDGVQQBCDI22HWORZUARXPWJZ64LLXY"
);
const userAddress = new Address(userKeypair.publicKey());

const GATEWAY_CONTRACT_ID =
  "CBDIR3ZU7KUHMF4MDRAAFZYJ2HXNWN553EW4QYCTYTI4M3HM3BYBM6W3";
const TOKEN_CONTRACT_ID =
  "CDXFYKTM4OAPKNMLH7H4EQCIH27OJYFXAOGKWPAJKNJ7DN3235ECF4FT";

const gateway = new Contract(GATEWAY_CONTRACT_ID);
const token = new Contract(TOKEN_CONTRACT_ID);
let LINKID  = 0


async function loadAccount() {
  return await server.getAccount(userKeypair.publicKey());
}

async function sendContractCall(contractCall) {
  const account = await loadAccount();

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(contractCall)
    .setTimeout(30)
    .build();

  tx.sign(userKeypair);

  const res = await server.sendTransaction(tx);
  console.log(`TX hash: ${res.hash}`);
  return res;
}


// methods from contract deployed.

export async function initGateway() {
  console.log("⏳ Init Gateway...");
  const tokenContractId = StrKey.decodeContract(TOKEN_CONTRACT_ID);
  const tokenAddress = Address.contract(tokenContractId);
  return sendContractCall(
    gateway.call("init", userAddress.toScVal(), tokenAddress.toScVal())
  );
}

export async function approveToken(spender, amount) {
  console.log("⏳ Approve Token...");
  return sendContractCall(
    token.call(
      "approve",
      userAddress.toScVal(),
      new Address(spender).toScVal(),
      nativeToScVal(amount.toString(), { type: "i256" }),
      nativeToScVal(0, { type: "u32" })
    )
  );
}

export async function addMerchantStellar(merchantPubKey) {
  const amount = BigInt(10 * 10 ** 7);
  await initGateway()
  await approveToken(GATEWAY_CONTRACT_ID,amount)
  console.log("⏳ Add Merchant...");
  return sendContractCall(
    gateway.call(
      "add_merchant",
      userAddress.toScVal(),
      new Address(merchantPubKey).toScVal()
    )
  );
}

export const createSubscription = async (amount, interval, name) => {
  try {
    console.log("⏳ Create Payment Link...");
    sendContractCall(
      gateway.call(
        "create_payment_link",
        userAddress.toScVal(),
        nativeToScVal(amount.toString(), { type: "i256" }),
        nativeToScVal(name, { type: "symbol" })
      )
    );

    LINKID = LINKID + 1;
    console.log("⏳ Process Payment...");
    sendContractCall(
        gateway.call(
          "process_payment",
          userAddress.toScVal(),
          nativeToScVal(LINKID, { type: "u32" })
        )
      );

    console.log("⏳ Create Subscription Plan...");
    sendContractCall(
      gateway.call(
        "create_subscription_plan",
        userAddress.toScVal(),
        nativeToScVal(amount.toString(), { type: "i256" }),
        nativeToScVal(interval, { type: "u32" }),
        nativeToScVal(name, { type: "symbol" })
      )
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function subscribe() {
  console.log("⏳ Subscribe...");
  return sendContractCall(
    gateway.call(
      "subscribe",
      userAddress.toScVal(),
      nativeToScVal(LINKID, { type: "u32" })
    )
  );
}


export async function processSubscriptionPayment(
  subscriberPubKey,
) {
  await subscribe()
  console.log("⏳ Process Subscription Payment...");
  return sendContractCall(
    gateway.call(
      "process_subscription_payment",
      userAddress.toScVal(),
      new Address(subscriberPubKey).toScVal(),
      nativeToScVal(LINKID, { type: "u32" })
    )
  );
}

