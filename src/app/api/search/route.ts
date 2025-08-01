//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const jobType = searchParams.get("jt") || "";
  const employmentType = searchParams.get("et");
  const page = searchParams.get("page")
    ? Number.parseInt(searchParams.get("page"))
    : 1;
  const limit = 10;
  const data = await prismaClient.job.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
      ...(jobType && { job_type: jobType }),
      ...(employmentType && { employment_type: employmentType }),
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  return NextResponse.json({
    success: true,
    data,
  });
}
