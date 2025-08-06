// @ts-nocheck
import JobCard from "@/components/cards/job-card";
import { data } from "@/data";

export default async function SearchPage({ searchParams }) {
  const searchParam = await searchParams;
  const query = searchParam.q;
  const jobType = searchParam.jt || "";
  const employmentType = searchParam.et || "";
  const salary = searchParam.ms || 100000;
  const page = searchParam.page || 1;

  const res = await fetch(
    `http://localhost:3000/api/search?q=${query}&page=${page}&jt=${jobType}&et=${employmentType}`
  );
  const data = await res.json();
  const jobs = data.data;

  return (
    <main className="h-[90vh]">
      <div className="flex flex-wrap justify-center gap-6 py-10 h-full overflow-auto">
        {jobs.map((job) => (
          <JobCard fromSearch={true} key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
