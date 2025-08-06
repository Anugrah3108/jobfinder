import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUserFromCookies();
  if (!user?.id) {
    return NextResponse.json({
      success: false,
      message: "Please Login.",
    });
  }
  const dataToSave = {
    ...body,
    user_id: user?.id,
  };
  try {
    const review = await prismaClient.review.create({
      data: dataToSave,
    });

    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      message: "Something wnet Wrong.",
    });
  }
}
