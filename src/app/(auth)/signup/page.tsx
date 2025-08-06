"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <Flex align="center" justify="center" className="min-h-[90vh] p-4">
      <Card size="3" style={{ width: "100%", maxWidth: 400 }}>
        <Heading size="4" mb="4" align="center">
          Sign Up
        </Heading>

        <form onSubmit={handleSubmit}>
          <Box mb="3">
            <Text as="label" size="2" mb="1">
              Email
            </Text>
            <TextField.Root
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full"
            />
          </Box>

          <Box mb="4">
            <Text as="label" size="2" mb="1">
              Password
            </Text>
            <TextField.Root
              type="password"
              required
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full"
            />
          </Box>
          <Box mb="4">
            <Flex gap={"2"} align={"center"}>
              <Text as="label" size="2" mb="1">
                Role:
              </Text>
              <Select.Root
                value={form.role}
                onValueChange={(value) => setForm({ ...form, role: value })}
              >
                <Select.Trigger className="w-full" placeholder="Select role" />
                <Select.Content>
                  <Select.Item value="Admin">Admin</Select.Item>
                  <Select.Item value="User">User</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Box>

          {error && (
            <Text color="red" size="2" mb="3">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            // color="blue"
            variant="solid"
            disabled={loading}
            className="w-full bg-[#5472E4] hover:bg-[#3c5dd1] text-white cursor-pointer"
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
        <Link href={"/signin"}>
          <button className="mt-4 py-2 w-full text-gray-400 hover:underline hover:text-gray-200 text-sm  shadow-md cursor-pointer">
            Existing User? Log in
          </button>
        </Link>
      </Card>
    </Flex>
  );
}
