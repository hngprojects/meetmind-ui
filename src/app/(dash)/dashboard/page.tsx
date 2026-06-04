"use client";
import Dashboard from "@/components/common/dash/dashboard/dashboard";
import Interview from "@/components/common/dash/liveInterview/interview";
import { fetchInterviews } from "@/components/common/dash/liveInterview/apiCall";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["interviews"],
    queryFn: fetchInterviews,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <p className="text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Unable to load interviews. Please try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const interviews = data?.data ?? [];
  const hasInterviews = interviews.length > 0;

  return <div>{hasInterviews ? <Interview /> : <Dashboard />}</div>;
};

export default Page;
