import Header from "@/components/header";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export default async function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const email = decodeURIComponent(cookie.get("token")?.value || "");

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}
