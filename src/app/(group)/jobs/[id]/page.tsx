import { notFound } from "next/navigation";

// Dummy example — replace with DB/API call
const jobs: Job[] = [
  {
    id: "1",
    title: "Software Developer",
    description: "This is a sample description",
    location: "Chicago, IL",
    employment_type: "part-time",
    salary: 85000,
    job_type: "remote",
  },
  // more jobs...
];

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) return notFound();

  return (import * as Dialog from "@radix-ui/react-dialog";

{jobs.map((job) => (
  <Dialog.Root key={job.id}>
    <div className="bg-[#1A1A1A] p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-sm">{job.description.substring(0, 100)}...</p>

      <Dialog.Trigger className="text-blue-500 mt-2 inline-block">
        View Job →
      </Dialog.Trigger>
    </div>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title className="text-2xl font-bold">{job.title}</Dialog.Title>
        <Dialog.Description className="mt-2">{job.description}</Dialog.Description>
        <div className="mt-4 space-y-2 text-sm">
          <div>📍 {job.location}</div>
          <div>💼 {job.employment_type}</div>
          <div>💰 ${job.salary.toLocaleString()}</div>
          <div>🌐 {job.job_type}</div>
        </div>
        <Dialog.Close className="mt-4 text-blue-600 underline">Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
))}
);
}
