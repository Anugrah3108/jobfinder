// @ts-nocheck
import AddJobForm from "@/components/add-job-form";
import JobCard from "@/components/cards/job-card";
import { data } from "@/data";

export default async function Home() {
  // const jobs = data?.data ?? [];
  // className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center"\

  const response = await fetch("http://localhost:3000/api/jobs");
  const data = await response.json();

  const jobs = data?.data;

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
