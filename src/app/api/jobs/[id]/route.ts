import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const param = await params;
  const id = param.id;
  try {
    const job = await prismaClient.openings.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });

    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Job Found.",
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const jobId = param?.id;

    const res = await prismaClient.openings.delete({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const param = await params;
  const jobId = param.id;

  try {
    const res = await prismaClient.openings.update({
      where: {
        id: jobId,
      },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
