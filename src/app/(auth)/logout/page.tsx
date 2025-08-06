"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogOut() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
      });
      router.push("/login");
    })();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <p className="text-center mt-10 font-semibold text-lg">Logging out...</p>
    </div>
  );
}
