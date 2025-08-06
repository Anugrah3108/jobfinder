import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await prismaClient.openings.findMany({
    take: 10,
    include: {
      company: true,
    },
  });

  // console.log("res", res);

  return NextResponse.json({
    success: true,
    data: res,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const product = await prismaClient.openings.create({
      data: body,
    });
    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
