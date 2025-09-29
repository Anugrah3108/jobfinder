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
      <head>
        {/* OG and Twitter meta tags for social sharing */}
        <title>{job.title} | JobFinder</title>
        <meta name="description" content={job.description} />
        <meta property="og:title" content={job.title + " | JobFinder"} />
        <meta property="og:description" content={job.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://jobfinder.anugrah.tech/jobs/${job.id}`}
        />
        <meta property="og:image" content="/public/og-image.png" />
        <meta property="og:site_name" content="JobFinder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={job.title + " | JobFinder"} />
        <meta name="twitter:description" content={job.description} />
        <meta name="twitter:image" content="/public/og-image.png" />
        <meta name="twitter:site" content="@yourtwitter" />
        <meta name="twitter:creator" content="@yourtwitter" />
        <link
          rel="canonical"
          href={`https://jobfinder.anugrah.tech/jobs/${job.id}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: job.description,
              datePosted: job.createdAt || new Date().toISOString(),
              validThrough:
                job.validThrough ||
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              employmentType: job.employment_type,
              jobLocation: {
                "@type": "Place",
                address: job.location,
              },
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: {
                  "@type": "QuantitativeValue",
                  value: job.salary,
                  unitText: "YEAR",
                },
              },
              hiringOrganization: {
                "@type": "Organization",
                name: job.company?.name || "JobFinder",
                sameAs:
                  "https://jobfinder.anugrah.tech/company/" +
                  (job.company?.id || ""),
              },
              identifier: {
                "@type": "PropertyValue",
                name: job.title,
                value: job.id,
              },
              url: `https://jobfinder.anugrah.tech/jobs/${job.id}`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://jobfinder.anugrah.tech/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Jobs",
                  item: "https://jobfinder.anugrah.tech/jobs",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: job.title,
                  item: `https://jobfinder.anugrah.tech/jobs/${job.id}`,
                },
              ],
            }),
          }}
        />
      </head>
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
