"use client";
import { UserContext } from "@/app/(group)/layout";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Company, Openings } from "../../generated/prisma";

export default function EditDeleteJob({
  job,
}: {
  job: Openings & { company: Company };
}) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    salary: "",
    jobType: "",
  });

  // Prefill form when dialog opens
  useEffect(() => {
    if (open) {
      setForm({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        employmentType: job.employment_type || "",
        salary: job.salary?.toString() || "",
        jobType: job.job_type || "",
      });
    }
  }, [open, job]);

  async function handleDelete() {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data?.success) {
        alert("Job Deleted Successfully.");
        router.refresh(); // optional: refresh the page or redirect
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Error deleting job.");
    }
  }

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
    const parsedSalary = parseFloat(form.salary);

    const updatedData = {
      title: form.title,
      description: form.description,
      location: form.location,
      employment_type: form.employmentType,
      salary: parsedSalary,
      job_type: form.jobType,
    };

    console.log(updatedData);

    const res = await fetch(`http://localhost:3000/api/jobs/${job.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    });

    const response = await res.json();
    if (response.success) {
      alert("Job updated successfully!");
      setOpen(false);
      router.refresh();
    }
  }

  if (user?.company?.id !== job.company.id) return null;

  return (
    <div className="flex gap-4">
      <Button variant="surface" color="red" onClick={handleDelete}>
        Delete
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button>Update</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 600 }}>
          <Dialog.Title>Update Job</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4" mt="4">
              {/* Job Title */}
              <Box>
                <Text as="label" size="2" mb="1">
                  Job Title
                </Text>
                <TextField.Root
                  placeholder="Job Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Box>

              {/* Description */}
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

              {/* Location + Salary */}
              <Flex gap="4">
                <Box style={{ flex: 3 }}>
                  <Text as="label" size="2" mb="1">
                    Job Location
                  </Text>
                  <TextField.Root
                    placeholder="Job Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                  />
                </Box>
                <Box style={{ flex: 2 }}>
                  <Text as="label" size="2" mb="1">
                    Job Salary
                  </Text>
                  <TextField.Root
                    placeholder="Job Salary"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                  />
                </Box>
              </Flex>

              {/* Employment Type */}
              <Box>
                <Text as="label" size="2" mb="1">
                  Employment Type
                </Text>
                <Select.Root
                  value={form.employmentType}
                  onValueChange={(val) =>
                    handleSelectChange("employmentType", val)
                  }
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
                <Text as="label" size="2" mb="1">
                  Job Type
                </Text>
                <Select.Root
                  value={form.jobType}
                  onValueChange={(val) => handleSelectChange("jobType", val)}
                >
                  <Select.Trigger placeholder="Select job type" />
                  <Select.Content>
                    <Select.Item value="remote">Remote</Select.Item>
                    <Select.Item value="onsite">Onsite</Select.Item>
                    <Select.Item value="hybrid">Hybrid</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>

              {/* Buttons */}
              <Flex justify="end" mt="3" gap="3">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" color="blue">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
