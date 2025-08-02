//@ts-nocheck
"use client";

import { Button } from "@radix-ui/themes";

export default function DeleteCompany({ id }) {
  async function handleDelete() {
    alert("Are you sure. You want to delete the company.");
    const res = await fetch(`/api/company/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      alert("Company Deleted");
    }
  }
  return <Button onClick={handleDelete}>Delete Company</Button>;
}
