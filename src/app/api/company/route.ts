//@ts-nocheck
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

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
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
    });
  }
}
