import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query: string = searchParams.get("q") ?? "";
  const jobType: string = searchParams.get("jt") ?? "";
  const employmentType: string = searchParams.get("et") ?? "";
  const salary: number = parseInt(searchParams.get("ms") ?? "0", 10);
  const page: number = parseInt(searchParams.get("page") ?? "1", 10);
  const limit: number = 10;
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
