"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AddCompanyForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name: form.name,
      description: form.description,
    };

    const res = await fetch("http://localhost:3000/api/company", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.success) {
      alert("Company added to DB!");
      window.location.href = "/";
    }

    console.log("Submitted:", form);
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card
        style={{
          width: 600,
          maxWidth: 600,
          minWidth: 350,
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Heading mb="4" size="6">
          Add Company
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Company Name */}
            <Box>
              <Text as="label" size="2" mb="1">
                Company Name
              </Text>
              <TextField.Root
                placeholder="Enter company name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Company Description */}
            <Box>
              <Text as="label" size="2" mb="1">
                Description
              </Text>
              <TextArea
                name="description"
                placeholder="Enter description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </Box>

            {/* Submit Button */}
            <Box mt="2">
              <Button type="submit" color="blue">
                Submit
              </Button>
            </Box>
          </Flex>
        </form>
      </Card>
    </div>
  );
}
