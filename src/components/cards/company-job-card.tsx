//@ts-nocheck
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CompanyJobCard({ job }) {
  return (
    <Card
      style={{
        width: "100%",
        marginTop: 10,
      }}
    >
      <Flex align="start" justify="between" mb="3">
        <Heading as="h5" size={"4"} className="truncate">
          {job.title}
        </Heading>
        <Badge color="blue">{job.employment_type}</Badge>
      </Flex>
      <Text
        as="p"
        className="line-clamp-5 md:text-md text-sm text-gray-600 mb-2"
      >
        {job.description}
      </Text>
      <Flex gap="3" wrap="wrap" my="2">
        <Badge color="green">{job.location}</Badge>
        <Badge color="orange">{job.job_type}</Badge>
        {/* <Badge color="purple">₹{job.salary.toLocaleString()}</Badge> */}
      </Flex>

      <Separator size="4" my="3" />

      <Link href={`/jobs/${job.id}`}>
        <Button color="indigo" variant="soft">
          <Text>View Job</Text>
          <ChevronRight />
        </Button>
      </Link>
    </Card>
  );
}
