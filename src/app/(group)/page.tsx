// @ts-nocheck
import AddJobForm from "@/components/add-job-form";
import JobCard from "@/components/cards/job-card";
import { data } from "@/data";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/jobs");
  const data = await response.json();
  // console.log("data", data);

  const jobs = data?.data;
  // console.log(jobs);
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
