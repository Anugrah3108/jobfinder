import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getUserFromCookies();
  const { id } = await params;

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not authenitcated.",
    });
  }

  const appToSave = {
    user_id: user?.id,
    job_id: id,
  };

  try {
    const applications = await prismaClient.applications.create({
      data: appToSave,
    });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return NextResponse.json({
      success: false,
      data: {
        message: "Failed to create application",
      },
    });
  }
}
