import EditDeleteJob from "@/components/edit-delete-job";
import GoBack from "@/components/go-back-btn";
import JobApplyButton from "@/components/job-apply-btn";
import ViewJobApplictions from "@/components/view-job-applications";
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
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
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
  const result = await res.json();

  if (!result.success) return notFound();

  const user = await getUserFromCookies();

  let userHasApplied = false;

  if (user) {
    const application = await prismaClient.applications.findMany({
      where: {
        job_id: id,
        user_id: user.id,
      },
    });

    if (application.length > 0) {
      userHasApplied = true;
    }
  }

  const job = result.data;

  return (
    <div className="relative">
      <GoBack />
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
            {!userHasApplied && <JobApplyButton job={job} />}
            <ViewJobApplictions job={job} />
            <Button variant="surface">Save</Button>
            <EditDeleteJob job={job} />
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
