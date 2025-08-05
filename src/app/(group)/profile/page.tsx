//@ts-nocheck
"use client";
import GoBack from "@/components/go-back-btn";
import {
  Badge,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import { CircleArrowLeft, CopyIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3000/api/current-user");
        const data = await res.json();

        //   console.log(data);

        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const name = user?.email
    ? user.email.split("@")[0].replace(/^./, (char) => char.toUpperCase())
    : "";

  if (loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 rounded-full border-dashed animate-spin border-indigo-500"></div>
          <p className="text-lg font font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" relative flex justify-center items-center h-[90vh]">
      <div className="absolute top-4 left-4 z-10">
        <GoBack />
      </div>
      <Card style={{ width: 600 }}>
        <DataList.Root>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Status</DataList.Label>
            <DataList.Value>
              <Badge
                color={user?.role === "admin" ? "green" : "blue"}
                variant="soft"
                radius="full"
              >
                {user?.role}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{user?.id}</Code>
                <IconButton
                  size="1"
                  aria-label="Copy value"
                  color="gray"
                  variant="ghost"
                >
                  <CopyIcon />
                </IconButton>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Owner Name</DataList.Label>
            <DataList.Value>{name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:vlad@workos.com">{user?.email}</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Company</DataList.Label>
            <DataList.Value>
              <Link target="_blank" href={`/company/${user?.company?.id}`}>
                {user?.company?.name}
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
    </div>
  );
}
