import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Button,
  Separator,
  Badge,
  Heading,
  ThickChevronRightIcon,
} from "@radix-ui/themes";

type Job = {
  employer_logo: string | null;
  employer_name: string;
  job_title: string;
  job_employment_type?: string;
  job_location?: string;
  job_state?: string;
  job_posted_at?: string;
  job_apply_link?: string;
  job_description?: string;
};

export default function Jobcard({
  job,
  fromSearch = false,
}: {
  job: Job;
  fromSearch: boolean;
}) {
  // return (
  //   <Box width="100%" style={{ maxWidth: "300px", minHeight: "340px" }}>
  //     <Card variant="classic" style={{ padding: "1rem", height: "100%" }}>
  //       {/* Top: Company Info */}
  //       <Flex gap="3" align="center" mb="3">
  //         <Avatar
  //           size="3"
  //           src={job.employer_logo || ""}
  //           radius="full"
  //           fallback="JD"
  //         />
  //         <Box>
  //           <Text as="div" size="2" weight="bold">
  //             {job.employer_name}
  //           </Text>
  //           <Text as="div" size="2" color="gray">
  //             {job.job_title}
  //           </Text>
  //         </Box>
  //       </Flex>

  //       <Separator size="4" my="2" />

  //       {/* Middle: Job Info */}
  //       <Box mb="3">
  //         {job.job_employment_type && (
  //           <Text as="p" size="2" color="gray">
  //             <strong>Type:</strong> {job.job_employment_type}
  //           </Text>
  //         )}
  //         {(job.job_city || job.job_state) && (
  //           <Text as="p" size="2" color="gray">
  //             <strong>Location:</strong> {job.job_city}, {job.job_state}
  //           </Text>
  //         )}
  //         {job.job_posted_at && (
  //           <Text as="p" size="2" color="gray">
  //             <strong>Posted:</strong> {job.job_posted_at}
  //           </Text>
  //         )}
  //       </Box>

  //       {/* Job Description Preview */}
  //       {job.job_description && (
  //         <Text
  //           as="p"
  //           size="2"
  //           color="gray"
  //           style={{
  //             display: "-webkit-box",
  //             WebkitLineClamp: 4,
  //             WebkitBoxOrient: "vertical",
  //             overflow: "hidden",
  //             textOverflow: "ellipsis",
  //             marginBottom: "1rem",
  //             lineHeight: "1.3rem",
  //             maxHeight: "5.2rem",
  //           }}
  //         >
  //           {job.job_description}
  //         </Text>
  //       )}

  //       {/* Apply Button */}
  //       <Flex justify="end" mt="auto">
  //         <Button asChild size="2" color="blue" variant="solid">
  //           <a
  //             href={job.job_apply_link || "#"}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             View Job
  //           </a>
  //         </Button>
  //       </Flex>
  //     </Card>
  //   </Box>
  // );

  return (
    <Card
      style={{
        maxWidth: fromSearch ? "100%" : "25%",
        minWidth: 350,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex align="start" justify={"between"} style={{ margin: 10 }}>
        <h2 className="lg:text-2xl text-md md:text-xl truncate">
          {job.job_title}
        </h2>
        <Badge color="blue">{job.job_employment_type}</Badge>
      </Flex>
      <div className="flex-1">
        <p className="line-clamp-5 md:text-md text-sm">{job.job_description}</p>
      </div>
      <Badge color="blue" style={{ margin: "10px 0", width: "min-content" }}>
        {job.job_location}
      </Badge>
      <Flex align={"end"} justify={"between"}>
        <Box maxWidth="240px">
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="2"
                src={job.employer_logo || ""}
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {job.employer_name}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>View Job</Text>
          <ThickChevronRightIcon />
        </Button>
      </Flex>
    </Card>
  );
}
