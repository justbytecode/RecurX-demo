import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";



export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // find the wallet exists or not
    const merchant = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!merchant) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: merchant.point }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Eror" },
      { status: 500 }
    );
  }
};
