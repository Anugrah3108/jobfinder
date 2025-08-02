//@ts-nocheck
"use client";
import Header from "@/components/header";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:3000/api/current-user");
      const data = await res.json();

      console.log(data);

      if (data.success) {
        setUser(data.data);
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
      </UserContext.Provider>
    </div>
  );
}
