//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const jobType = searchParams.get("jt") || "";
  const employmentType = searchParams.get("et") || "";
  const salary = searchParams.get("ms") || 0;
  const page = searchParams.get("page")
    ? Number.parseInt(searchParams.get("page"))
    : 1;
  const limit = 10;
  const data = await prismaClient.openings.findMany({
    // not working properly needto be assessed.
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          company: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
      title: {
        contains: query,
        mode: "insensitive",
      },
      ...(jobType && { job_type: jobType }),
      ...(employmentType && { employment_type: employmentType }),
      // ...(salary && { salary: { gte: salary } }),
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  return NextResponse.json({
    success: true,
    data,
  });
}
