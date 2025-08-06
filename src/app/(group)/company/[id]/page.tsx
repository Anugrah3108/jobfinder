// @ts-nocheck
import CompanyJobCard from "@/components/cards/company-job-card";
import CompanyListingAndReviews from "@/components/company-listing-review";
import DeleteCompany from "@/components/delete-company";
import GoBack from "@/components/go-back-btn";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";

export default async function Company({ params }) {
  const param = await params;
  const id = param.id;

  const res = await fetch(`http://localhost:3000/api/company/${id}`);

  const data = await res.json();

  const company = data.data?.company;
  // console.log(company);

  // const owner = data?.data.owner;

  const revRes = await fetch(`http://localhost:3000/api/review/${id}`);
  const revData = await revRes.json();
  const reviews = await revData.data;

  return (
    <div className="relative flex justify-center items-center">
      <GoBack />
      <Box className="w-2xl mx-auto p-6">
        <Card variant="classic">
          <Flex justify={"between"} align={"center"}>
            <Heading size="5">{company.name}</Heading>
            <Flex align={"center"} gap={"1"}>
              by: <Badge color="blue">{company.owner.email}</Badge>
            </Flex>
          </Flex>
          <Separator size="4" my="4" />
          <Card as="p" size="2">
            {company.description}
          </Card>
          <Flex justify={"end"}>
            <DeleteCompany id={company.id} />
          </Flex>
          <Separator size="4" my="2" />
          <Box mt="2">
            <CompanyListingAndReviews reviews={reviews} company={company} />
          </Box>
        </Card>
      </Box>
    </div>
  );
}

// window.location.href
