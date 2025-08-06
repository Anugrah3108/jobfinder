import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id: id,
      },
      include: {
        jobs: true,
        owner: {
          omit: {
            password: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({
        success: false,
        message: "No Company Found.",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        company,
      },
    });
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
  const { id } = await params;
  const user = await getUserFromCookies();

  if (user?.company?.id == id) {
    const res = await prismaClient.company.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted Successfully",
    });
  }

  return NextResponse.json({
    success: false,
    message: "Something went wrong",
  });
}
