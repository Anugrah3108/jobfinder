import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userCookies = await cookies();
  const email = userCookies.get("token")?.value;

  if (!email) {
    return NextResponse.json({
      success: false,
      message: "User not authenticated",
    });
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }
  return NextResponse.json({
    success: true,
    user: user,
  });
}
