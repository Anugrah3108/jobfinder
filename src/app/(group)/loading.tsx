export default function LoadingPage() {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 rounded-full border-dashed animate-spin border-indigo-500"></div>
        <p className="text-lg font font-medium">Loading...</p>
      </div>
    </div>
  );
}
