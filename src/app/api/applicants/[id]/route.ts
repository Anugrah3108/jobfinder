import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const res = await prismaClient.applications.findMany({
      where: {
        job_id: id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return NextResponse.json({
      success: true,
      data: {
        message: "Something went wrong",
      },
    });
  }
}
