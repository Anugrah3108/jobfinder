//@ts-nocheck
import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
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

      const userTokenData = {
        id: user.id,
      };

      const token = createToken(userTokenData);
      res.cookies.set("token", token);

      return res;
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
