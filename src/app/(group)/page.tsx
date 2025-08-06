import JobCard from "@/components/cards/job-card";
import { Company, Openings } from "../../../generated/prisma";
import Link from "next/link";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/jobs");
  const data = await response.json();
  const jobs = data?.data;

  return (
    <main className="min-h-screen w-full scroll-smooth bg-gray-900 text-white">
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-950 to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-6">
          Find jobs that match your skills and explore the best companies hiring
          today.
        </p>

        <div className="flex gap-4">
          <a
            href="#jobs"
            className="bg-[#5472E4] text-white px-6 py-3 rounded-lg hover:bg-[#5472E4] transition"
          >
            Explore Jobs
          </a>
          <Link
            href="/company"
            className="border border-[#5472E4] text-[#5472E4] px-6 py-3 rounded-lg hover:bg-[#5472E4] hover:text-white transition"
          >
            Explore Companies
          </Link>
        </div>
      </section>
      <section id="jobs" className="py-12 pt-[70px] px-6 bg-gray-950">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">
          Featured Jobs
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {jobs.map((job: Openings & { company: Company }) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
