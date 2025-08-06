"use client";
import Header from "@/components/header";
import { createContext, useEffect, useState } from "react";
import { Company, User } from "../../../generated/prisma";
import Footer from "@/components/footer";
import { Separator } from "@radix-ui/themes";

export const UserContext = createContext<{
  user?: (User & { company: Company }) | null;
  setUser?: (value: User & { company: Company }) => void;
}>({});

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:3000/api/current-user");
      const data = await res.json();

      if (data.success) {
        setUser(data?.data);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Header />
        {children}
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
