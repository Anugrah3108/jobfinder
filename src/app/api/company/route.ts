import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await prismaClient.company.findMany();
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
    });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

  console.log("user", user);

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
    });
  }

  const body = await req.json();

  const company = {
    name: body.name,
    description: body.description,
    owner_id: user.id,
  };
  try {
    const newCompany = await prismaClient.company.create({
      data: company,
    });

    return NextResponse.json({
      success: true,
      data: newCompany,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
    });
  }
}
