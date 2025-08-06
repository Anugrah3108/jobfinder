"use client";

import { useEffect, useState } from "react";
import { Card, Button, Text, Heading, Flex } from "@radix-ui/themes";
import Link from "next/link";
import LoadingPage from "../loading";
import { ArrowRight } from "lucide-react"; // 👈 Lucide icon
import GoBack from "@/components/go-back-btn";

type Company = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
};

export default function AllCompany() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch("http://localhost:3000/api/company");
        const data = await res.json();
        setCompanies(data?.data || []);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8 h-[90vh]">
      <GoBack />
      <Heading size="7" mb="6" align="center">
        All Companies
      </Heading>

      {loading && <LoadingPage />}

      {!loading && companies.length === 0 && (
        <Text align="center">No companies found.</Text>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          companies.map((company) => (
            <Card
              key={company.id}
              className="p-6 space-y-3 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
            >
              <Heading size="5">{company.name}</Heading>
              <Text color="gray">{company.description}</Text>
              <Flex justify="end">
                <Link href={`/company/${company.id}`}>
                  <Button variant="solid" color="indigo">
                    View Company <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Flex>
            </Card>
          ))}
        <p className="text-[#5472E4]">More Companies adding soon...</p>
      </div>
    </div>
  );
}
