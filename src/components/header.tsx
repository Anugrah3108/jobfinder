"use client";

import { Box, Flex, Text, Button, DropdownMenu } from "@radix-ui/themes";
import { Bookmark, Building2, Send, Share, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="sticky top-0 z-30 bg-gray-950">
      <Box
        width="100%"
        className="border-b border-gray-300 sticky top-0 bg-[--color-panel-solid] z-50"
        p="3"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          {/* Left: Logo */}
          <Text size="4" weight="bold" color="indigo" asChild>
            <Link href="/" className="shadow-md ">
              JobFinder.io
            </Link>
          </Text>

          {/* Middle: Search Box */}
          <SearchInput />

          {/* Right: Nav Links */}
          {!user && (
            <Link href={`/login`}>
              <Button
                variant="solid"
                size="2"
                color="indigo"
                className="hover:text-indigo-600 transition cursor-pointer"
              >
                Login
              </Button>
            </Link>
          )}

          {user && (
            <Flex gap="4" align="center" className="flex-wrap justify-center">
              <Link href={`/company`}>
                <Button
                  variant="surface"
                  size="2"
                  color="indigo"
                  className="hover:text-indigo-600 transition cursor-pointer"
                >
                  Explore Companies
                </Button>
              </Link>

              {user?.company && (
                <Link href={"/add-job"}>
                  <Button
                    size="2"
                    color="indigo"
                    className="hover:text-indigo-600 transition cursor-pointer"
                  >
                    Add Job
                  </Button>
                </Link>
              )}

              {!user?.company && (
                <Link href={"company/add-company"}>
                  <Button size="2" color="indigo">
                    Add Company
                  </Button>
                </Link>
              )}

              {/* user dropdown */}

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <UserCircleIcon size={36} />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item color="indigo" asChild>
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  {user?.company?.id && (
                    <DropdownMenu.Item asChild>
                      <Link href={`/company/${user?.company?.id}`}>
                        <Flex align={"center"} gap={"2"}>
                          <Text>My Company</Text>
                          <Building2 className="h-4 w-4" />
                        </Flex>
                      </Link>
                    </DropdownMenu.Item>
                  )}
                  <DropdownMenu.Item asChild>
                    <Flex align={"center"} gap={"2"}>
                      <Text>Favourites</Text>
                      <Bookmark className="h-4 w-4" />
                    </Flex>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red" asChild>
                    <Link href={"/logout"}>Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          )}
        </Flex>
      </Box>
    </header>
  );
}
