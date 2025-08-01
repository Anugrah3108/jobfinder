import AddJobForm from "@/components/add-job-form";
import AddAllJobs from "@/serveractions/add-all-data";

export default function AddJob() {
  return (
    <div className="mt-6">
      {/* <AddAllJobs /> */}
      <AddJobForm />
    </div>
  );
}
