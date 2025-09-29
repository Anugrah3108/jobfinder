import jwt from "jsonwebtoken";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/services/jwt";

// TODO: Replace 'any' with a proper user type
export async function getUserFromCookies(): Promise<any | null> {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) return null;
  const data: any = verifyToken(token);
  if (!data) return null;
  let user: any;
  try {
    user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        company: true,
      },
      omit: {
        password: true,
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }

  if (!user) return null;

  return user;
}
