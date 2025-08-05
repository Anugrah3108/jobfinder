// @ts-nocheck
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
  const id = params.id;

  const res = await fetch(`http://localhost:3000/api/company/${id}`);

  const data = await res.json();
  console.log(data);

  const company = data.data?.company;

  // const owner = data?.data.owner;

  return (
    <div className="relative flex justify-center items-center h-[90vh]">
      <GoBack />
      <Box className="w-2xl mx-auto p-6">
        <Card variant="classic">
          <Heading size="7" mb="4">
            {company.name}
          </Heading>
          <Separator size="4" my="4" />
          <Text as="p" size="2">
            {company.description}
          </Text>
          <Box maxWidth="180px" mt="4">
            <Card p="2">
              <Flex gap={"2"} align={"center"} justify={"center"}>
                <Text>Owner: </Text>
                <Badge color="blue">{company.owner.email}</Badge>
              </Flex>
            </Card>
          </Box>
          <Separator size="4" my="4" />
          <DeleteCompany id={company.id} />
        </Card>
      </Box>
    </div>
  );
}

// window.location.href
