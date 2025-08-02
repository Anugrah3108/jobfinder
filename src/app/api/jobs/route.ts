//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await prismaClient.job.findMany({
    take: 10,
  });

  return NextResponse.json({
    success: true,
    data: res,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const jobToSave = {
    title: body.title,
    description: body.description,
    salary: body.salary,
    location: body.location,
    employment_type: body.employment_type || "full-time",
    job_type: body.job_type || "on-site",
  };

  try {
    const product = await prismaClient.job.create({
      data: jobToSave,
    });
    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
