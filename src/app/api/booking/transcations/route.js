import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request) => {
  try {
    const data = await request.json();
    if (
      !data ||
      !data.walletAddress ||
      !data.transcationID ||
      !data.amount ||
      !data.token
    ) {
      return NextResponse.json(
        { message: "Required the info" },
        { status: 403 }
      );
    }

    const { walletAddress, transcationID, amount, token } = await data;
    const tnxId = uuidv4();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Get the transcation
export const GET = async (request) => {
  try {
    const { searchParams } = await new URL(request.url);
    const walletAddress = searchParams.get("walletaddress");
    return NextResponse.json({ message: "Transcations" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
