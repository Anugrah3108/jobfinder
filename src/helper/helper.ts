//@ts-nocheck
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const email = userCookies.get("token")?.value;

  if (!email) return null;
  let user;
  try {
    user = await prismaClient.user.findUnique({
      where: {
        email: email,
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
