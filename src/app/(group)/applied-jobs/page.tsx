import Jobcard from "@/components/cards/job-card";
import GoBack from "@/components/go-back-btn";
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";

export default async function AppliedJobs() {
  const user = await getUserFromCookies();

  if (!user) {
    return <div>User not found.</div>;
  }

  const applications = await prismaClient.applications.findMany({
    where: {
      user_id: user?.id,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!applications.length) {
    return <div>No applications found.</div>;
  }

  return (
    <div className="relative min-h-[90vh]">
      <GoBack />
      <h2 className=" pt-6 px-25 font-semibold text-lg">Your Applications: </h2>
      <div className="flex flex-wrap justify-start gap-6 m-4">
        {applications.map((appl) => {
          return <Jobcard key={appl.id} job={appl.job} />;
        })}
      </div>
    </div>
  );
}
