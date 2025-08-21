// confirm the transcation hash
import { ethers } from "ethers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const data = await request.json();
    if (!data || !data.transcationHash || !data.walletAddress) {
      return NextResponse.json(
        { message: "Transcation Hash is required" },
        { status: 404 }
      );
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const receipt = await provider.getTransactionReceipt(data.transcationHash);
    if (receipt && receipt.status === 1) {
      // send mail and update the status
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      // send mail of transcation failed and update status as failed
      return NextResponse.json({ message: "Failed" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};
