//@ts-nocheck
import jwt from "jsonwebtoken";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/services/jwt";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) return null;
  const data = verifyToken(token);
  if (!data) return null;
  let user;
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
  } catch (error) {
    console.log(error.message);
  }

  if (!user) return null;

  return user;
}
