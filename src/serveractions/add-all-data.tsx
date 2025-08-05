import { data } from "@/data";
import prismaClient from "@/services/prisma";

export default function AddAllJobs() {
  async function addData() {
    "use server";
    const newData = data.data.map((elem) => {
      return {
        title: elem.job_title,
        description: elem.job_description,
        salary: 200000,
        location: elem.job_location,
        employment_type: "full-time",
        job_type: "on-site",
      };
    });
    try {
      const data = await prismaClient.openings.createMany({
        data: newData,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form action={addData}>
      <button type="submit">Sum</button>
    </form>
  );
}
