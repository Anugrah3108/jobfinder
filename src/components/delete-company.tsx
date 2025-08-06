//@ts-nocheck
"use client";

import { UserContext } from "@/app/(group)/layout";
import { Button } from "@radix-ui/themes";
import { useContext } from "react";

export default function DeleteCompany({ id }) {
  const { user } = useContext(UserContext);
  async function handleDelete() {
    alert("Are you sure. You want to delete the company.");
    const res = await fetch(`/api/company/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      alert("Company Deleted");
      window.location.href = "/";
    }
  }

  if (id != user?.company?.id) return null;
  return (
    <Button style={{ marginBlock: 10 }} color="red" onClick={handleDelete}>
      Delete Company
    </Button>
  );
}
