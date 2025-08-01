"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes"; // Or use from lucide-react if preferred
import { useState } from "react";

export default function AddJobForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    salary: "",
    jobType: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSelectChange(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedSalary = Number.parseFloat(form.salary);
    const data = {
      title: form.title,
      description: form.description,
      location: form.location,
      employment_type: form.employmentType,
      salary: parsedSalary,
      job_type: form.jobType,
    };
    const res = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.success) {
      alert("Product added in DB!");
    }
    console.log("Submitted:", form);
  }

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <Heading mb="4" size="6">
        Add Job
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          {/* Job Title */}
          <Box>
            <Text as="label" size="2" mb="1">
              Job Title
            </Text>
            <TextField.Root
              placeholder="Job Title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Box>

          {/* Job Description */}
          <Box>
            <Text as="label" size="2" mb="1">
              Job Description
            </Text>
            <TextArea
              name="description"
              placeholder="Enter job description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Box>

          {/* Job Location */}
          <Flex gap="4">
            <Box style={{ flex: 3 }}>
              <Text as="label" size="2" mb="1">
                Job Location
              </Text>
              <TextField.Root
                placeholder="Job Location"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <Text as="label" size="2" mb="1">
                Job Salary
              </Text>
              <TextField.Root
                placeholder="Job Salary"
                value={form.salary}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, salary: e.target.value }))
                }
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
          </Flex>
          {/* Employment Type */}
          <Box>
            <Text as="label" size="2" mb="1">
              Employment Type
            </Text>
            <Select.Root
              value={form.employmentType}
              onValueChange={(val) => handleSelectChange("employmentType", val)}
              required
            >
              <Select.Trigger placeholder="Select employment type" />
              <Select.Content>
                <Select.Item value="full-time">Full-time</Select.Item>
                <Select.Item value="part-time">Part-time</Select.Item>
                <Select.Item value="contract">Contract</Select.Item>
                <Select.Item value="internship">Internship</Select.Item>
              </Select.Content>
            </Select.Root>
          </Box>

          {/* Job Type */}
          <Box>
            <Text as="label" size="2" className="block mb-1">
              Job Type
            </Text>
            <Select.Root
              value={form.jobType}
              onValueChange={(val) => handleSelectChange("jobType", val)}
              required
            >
              <Select.Trigger
                placeholder="Select job type"
                className="w-full"
              />
              <Select.Content>
                <Select.Item value="remote">Remote</Select.Item>
                <Select.Item value="onsite">Onsite</Select.Item>
                <Select.Item value="hybrid">Hybrid</Select.Item>
              </Select.Content>
            </Select.Root>
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
  );
}
