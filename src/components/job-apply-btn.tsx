"use client";
import { Button } from "@radix-ui/themes";
import { Openings } from "../../generated/prisma";

export default function JobApplyButton({ job }: { job: Openings }) {
  async function handleSubmit() {
    try {
      const res = await fetch("/api/jobs/apply/" + job?.id);
      const data = await res.json();
      if (data.success) {
        alert("Applied Successfully.");
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("Something went wrong");
    }
  }
  return (
    <Button color="blue" onClick={handleSubmit}>
      Apply
    </Button>
  );
}
