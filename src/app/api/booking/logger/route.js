// store the logs and

import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const data = await request.json();
    const { walletAddress, transcationId, transcationHash, status, token } =
      await data;
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
