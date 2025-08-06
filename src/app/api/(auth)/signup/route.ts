//@ts-nocheck
import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const userData = {
    email: body.email,
    password: body.password,
    role: body.role,
  };

  try {
    const user = await prismaClient.user.create({
      data: userData,
    });
    // const res = NextResponse.json({
    //   success: true,
    //   data: user,
    // });
    const userTokenData = {
      id: user.id,
    };

    const token = createToken(userTokenData);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
