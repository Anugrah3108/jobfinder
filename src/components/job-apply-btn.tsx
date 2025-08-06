//@ts-nocheck
"use client";
import { Button } from "@radix-ui/themes";

export default function JobApplyButton({ job }) {
  async function handleSubmit() {
    try {
      const res = await fetch("/api/jobs/apply/" + job?.id);
      const data = await res.json();
      if (data.success) {
        alert("Applied Successfully.");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }
  return (
    <Button color="blue" onClick={handleSubmit}>
      Apply
    </Button>
  );
}
