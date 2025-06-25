import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKeys = await prisma.apiKey.findMany({
    where: { merchant: { email: session.user.email } },
  });
  return NextResponse.json(apiKeys);
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = randomBytes(32).toString("hex");
  const clientId = randomBytes(16).toString("hex");
  const clientSecret = randomBytes(32).toString("hex");

  const newApiKey = await prisma.apiKey.create({
    data: {
      key: apiKey,
      clientId,
      clientSecret,
      merchant: { connect: { email: session.user.email } },
    },
  });
  return NextResponse.json(newApiKey);
}