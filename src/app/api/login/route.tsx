//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prismaClient.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user?.password == body?.password) {
    const res = NextResponse.json({
      success: true,
      user,
    });
    res.cookies.set("token", user?.email);

    return res;
  }

  return NextResponse.json({
    success: false,
  });
}
