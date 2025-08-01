//@ts-nocheck
"use client";

import { Box, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

const links = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  // { label: "Add Job", href: "/add-job" },
  //   { label: "Contact", href: "/contact" },
];

export default function Header({ user }) {
  return (
    <header className="sticky top-0 z-30 bg-gray-900">
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
            <Link href="/">JobFinder.io</Link>
          </Text>

          {/* Middle: Search Box */}
          <SearchInput />

          {/* Right: Nav Links */}
          <Flex gap="4" align="center" className="flex-wrap justify-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-600 transition cursor-pointer"
                >
                  {link.label}
                </Text>
              </Link>
            ))}

            {user.role == "admin" && (
              <Link href={"/add-job"}>
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-600 transition cursor-pointer"
                >
                  Add Job
                </Text>
              </Link>
            )}

            <Link href="/profile">
              <UserCircleIcon size={36} />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
