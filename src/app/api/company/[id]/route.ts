//@ts-nocheck
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const id = await params.id;

  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id: id,
      },
      include: {
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

    // const owner = await prismaClient.user.findUnique({
    //   where: {
    //     id: company?.owner_id,
    //   },
    // });

    // if (!owner) {
    //   return NextResponse.json({
    //     success: false,
    //     message: "Validate Owner.",
    //   });
    // }

    return NextResponse.json({
      success: true,
      data: {
        company,
        // owner,
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  const { id } = await params;
  const user = await getUserFromCookies();

  // const company = await prismaClient.company.findUnique({
  //   where: {
  //     id,
  //   },
  // });

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
