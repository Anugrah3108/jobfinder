//@ts-nocheck
"use client";
import { UserContext } from "@/app/(group)/layout";
import { Badge, Button, Card, Dialog, Flex, Spinner } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";

export default function ViewJobApplictions({ job }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false); //add loading state

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getApplicants() {
      setLoading(true);
      const res = await fetch("/api/applicants/" + job.id);
      const data = await res.json();
      if (data?.success) {
        setApplicants(data?.data);
      }
      setLoading(false);
    }
    getApplicants();
  }, []);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          All the applicants applied to this job.
        </Dialog.Description>
        {loading && <Spinner size={"3"} />}
        <div>
          {applicants.map((item) => {
            return (
              <Card key={item.id}>
                <Flex justify={"between"} align={"center"}>
                  <Badge>{item?.user?.email}</Badge>
                  {user.id == item?.user.id && (
                    <Button color="red" variant="soft">
                      Delete
                    </Button>
                  )}
                </Flex>
              </Card>
            );
          })}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
