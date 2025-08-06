import JobCard from "@/components/cards/job-card";
import { Company, Openings } from "../../../generated/prisma";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/jobs");
  const data = await response.json();
  const jobs = data?.data;
  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {jobs.map((job: Openings & { company: Company }) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
