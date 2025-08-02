//@ts-nocheck
import {
  Card,
  Heading,
  Text,
  Box,
  Flex,
  Separator,
  Button,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";

export default async function JobDetails({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/jobs/${params.id}`, {
    cache: "no-store",
  });

  const result = await res.json();

  if (!result.success) return notFound();

  const job = result.data;

  return (
    <Box className="max-w-2xl mx-auto p-6">
      <Card variant="classic">
        <Heading size="7" mb="4">
          {job.title}
        </Heading>

        <Text as="p" size="2" className="h-[220px] overflow-y-scroll">
          {job.description}
        </Text>

        <Separator size="4" my="4" />

        <Flex direction="column" gap="2">
          <Text>
            <strong>Location:</strong> {job.location}
          </Text>
          <Text>
            <strong>Employment Type:</strong> {job.employment_type}
          </Text>
          <Text>
            <strong>Job Type:</strong> {job.job_type}
          </Text>
          <Text>
            <strong>Salary:</strong> ₹{job.salary}
          </Text>
        </Flex>

        {/* Action Buttons */}
        <Flex mt="5" gap="4">
          <Button color="blue">Apply</Button>
          <Button variant="surface">Save</Button>
        </Flex>
      </Card>
    </Box>
  );
}
