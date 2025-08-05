//@ts-nocheck
import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Button,
  Badge,
  Heading,
  Separator,
} from "@radix-ui/themes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// type Job = {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   employment_type: string;
//   salary: number;
//   job_type: string;
// };

export default function Jobcard({
  job,
  fromSearch = false,
}: {
  job: Job;
  fromSearch: boolean;
}) {
  return (
    <Card
      style={{
        maxWidth: fromSearch ? "100%" : "25%",
        minWidth: fromSearch ? "100%" : "350px",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      {/* Top: Title + Employment Type */}
      <Flex align="start" justify="between" mb="3">
        <Heading as="h3" className="lg:text-2xl text-md md:text-xl truncate">
          {job.title}
        </Heading>
        <Badge color="blue">{job.employment_type}</Badge>
      </Flex>

      {/* Description */}
      <Text
        as="p"
        className="line-clamp-5 md:text-md text-sm text-gray-600 mb-2"
      >
        {job.description}
      </Text>

      {/* Location + Job Type + Salary */}
      <Flex gap="3" wrap="wrap" my="2">
        <Badge color="green">{job.location}</Badge>
        <Badge color="orange">{job.job_type}</Badge>
        {/* <Badge color="purple">₹{job.salary.toLocaleString()}</Badge> */}
      </Flex>

      <Separator size="4" my="3" />

      {/* Footer: Dummy Avatar + Button */}
      <Flex align="center" justify="between" mt="auto">
        <Flex gap="3" align="center">
          <Avatar size="2" fallback="J" radius="full" src="" />
          <Box>
            <Text size="2" weight="bold">
              <Link href={`http://localhost:3000/company/${job?.company.id}`}>
                {job?.company?.name}
              </Link>
            </Text>
          </Box>
        </Flex>

        <Link href={`/jobs/${job.id}`}>
          <Button size="2" color="blue" variant="solid">
            <Text mr="1">View Job</Text>
            <ChevronRight />
          </Button>
        </Link>
      </Flex>
    </Card>
  );
}
