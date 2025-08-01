"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (data.success) {
      //   alert("logged IN");
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <Flex align="center" justify="center" className="min-h-[90vh] p-4">
      <Card size="3" style={{ width: "100%", maxWidth: 400 }}>
        <Heading size="4" mb="4" align="center">
          Login
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

          {error && (
            <Text color="red" size="2" mb="3">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            color="blue"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </Flex>
  );
}
