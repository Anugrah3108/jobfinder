"use client";
import { Button, Card, RadioGroup, Slider, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  // const ms = searchParams.get("ms");
  const q = searchParams.get("q");

  const router = useRouter();

  const [jobType, setJobType] = useState(jt || "remote");
  const [employmentType, setEmploymentType] = useState(et || "full-time");
  const [salary, setSalary] = useState<number[]>([100000]);

  function handleSubmit() {
    const url = `/search?q=${q}&page=1&jt=${jobType}&et=${employmentType}`;
    router.push(url);
  }

  return (
    <div className="py-10 min-w-64">
      <div className="flex flex-col gap-6">
        <Card>
          <Text className="font-semibold">Job Type:</Text>
          <RadioGroup.Root
            value={jobType}
            onValueChange={(val) => setJobType(val)}
            name="example"
          >
            <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
            <RadioGroup.Item value="on-site">On-site</RadioGroup.Item>
            <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
        <Card>
          <Text className="font-semibold">Employment Type:</Text>
          <RadioGroup.Root
            value={employmentType}
            onValueChange={(val) => setEmploymentType(val)}
            name="example"
          >
            <RadioGroup.Item value="full-time">Full-Time</RadioGroup.Item>
            <RadioGroup.Item value="part-time">Part-Time</RadioGroup.Item>
            <RadioGroup.Item value="contractor">Contract</RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
        <Card>
          <Text className="font-semibold block" style={{ marginBottom: 10 }}>
            Salary Range:
          </Text>
          <Slider
            value={salary}
            onValueChange={setSalary}
            min={100000}
            max={1000000}
            step={1000}
            variant="soft"
          />
          <Text style={{ marginTop: 10 }}>
            Selected: ₹{salary[0].toLocaleString()}
          </Text>
        </Card>
        <Button onClick={handleSubmit}>Apply Filters.</Button>
      </div>
    </div>
  );
}
