"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/common/dash/dashboard/dashboard";
import Interview from "@/components/common/dash/liveInterview/interview";
import { fetchInterviews } from "@/components/common/dash/liveInterview/apiCall";

const Page = () => {
  const [hasInterviews, setHasInterviews] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkInterviews = async () => {
      try {
        const data = await fetchInterviews();
        const interviews = data?.data ?? [];
        setHasInterviews(interviews.length > 0);
      } catch (err) {
        console.error("Failed to fetch interviews:", err);
        setError("Unable to load interviews. Please try again.");
        setHasInterviews(false);
      }
    };

    checkInterviews();
  }, []);

  if (hasInterviews === null && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return <div>{hasInterviews ? <Interview /> : <Dashboard />}</div>;
};

export default Page;
