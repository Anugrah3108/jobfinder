import AddJobForm from "@/components/add-job-form";
import GoBack from "@/components/go-back-btn";

export default function AddJob() {
  return (
    <div className="relative flex justify-center items-center h-[90vh]">
      <GoBack />
      {/* <AddAllJobs /> */}
      <AddJobForm />
    </div>
  );
}
