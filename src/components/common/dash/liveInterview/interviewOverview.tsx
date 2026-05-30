"use client";
import { useDashboardStore } from "@/store/dashboardInterview";
import { useUserDetailsStore } from "@/store/userDetail";
import { useEffect } from "react";

const InterviewOverview = () => {
  const { candidate } = useUserDetailsStore();

  const { overview, loading, error, getOverview } = useDashboardStore();

  useEffect(() => {
    getOverview();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!overview) return null;

  return (
    <div>
      <h1>Good morning, {candidate.full_name || "John Doe"}</h1>

      <div className="">
        <h1>Set up a new interview</h1>
        <p>
          You have {overview.stats.in_progress} interviews running and{" "}
          {overview.stats.completed} results ready to review.
        </p>
      </div>
    </div>
  );
};

export default InterviewOverview;
