"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/common/dash/dashboard/dashboard";
import Interview from "@/components/common/dash/liveInterview/interview";
import { fetchInterviews } from "@/components/common/dash/liveInterview/apiCall";

const Page = () => {
  const [hasInterviews, setHasInterviews] = useState<boolean | null>(null);

  useEffect(() => {
    const checkInterviews = async () => {
      try {
        const data = await fetchInterviews();
        const interviews = data?.data ?? [];
        setHasInterviews(interviews.length > 0);
      } catch {
        setHasInterviews(false);
      }
    };

    checkInterviews();
  }, []);

  // ✅ This is outside useEffect
  if (hasInterviews === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return <div>{hasInterviews ? <Interview /> : <Dashboard />}</div>;
};

export default Page;
