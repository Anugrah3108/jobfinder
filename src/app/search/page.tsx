// @ts-nocheck
import JobCard from "@/components/cards/job-card";
import { data } from "@/data";

export default function SearchPage() {
  const jobs = data?.data ?? [];
  return (
    <main className="h-[90vh]">
      <div className="flex flex-wrap justify-center gap-6 py-10 h-full overflow-auto">
        {jobs.map((job) => (
          <JobCard fromSearch={true} key={job.job_id} job={job} />
        ))}
      </div>
    </main>
  );
}
