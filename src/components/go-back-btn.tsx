"use client";
import { CircleArrowLeft } from "lucide-react";

export default function GoBack() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        className="p-2 bg-gray-600 rounded-md"
        onClick={() => window.history.back()}
      >
        <CircleArrowLeft />
      </button>
    </div>
  );
}
