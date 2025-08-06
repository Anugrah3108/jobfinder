"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import { Company, Openings, User } from "../../generated/prisma";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { Trash2 } from "lucide-react"; // Optional icon

export default function ViewJobApplictions({
  job,
}: {
  job: Openings & { user: User };
}) {
  const [applicants, setApplicants] = useState<(Openings & { user: User })[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getApplicants() {
      try {
        setLoading(true);
        const res = await fetch("/api/applicants/" + job.id);
        const data = await res.json();
        if (data?.success) {
          setApplicants(data?.data);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    }
    getApplicants();
  }, [job.id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="solid">View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="480px">
        <Dialog.Title>Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          These candidates have applied to this job opening.
        </Dialog.Description>

        {loading && (
          <Flex justify="center" align="center" py="4">
            <Spinner size="3" />
          </Flex>
        )}

        {!loading && applicants.length === 0 && (
          <Text size="2" color="gray">
            No applicants have applied yet.
          </Text>
        )}

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {applicants.map((item) => (
            <Card
              key={item.id}
              className="p-4 shadow-sm border border-gray-200"
            >
              <Flex justify="between" align="center">
                <Badge color="indigo" size="2">
                  {item?.user?.email}
                </Badge>

                {user?.id === item?.user.id && (
                  <Button color="red" variant="soft" size="2">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </Flex>
            </Card>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
