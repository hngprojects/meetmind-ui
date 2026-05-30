import type { CandidateStatus } from "@/lib/types/candidates";

export const STATUS_LABELS: Record<"all" | CandidateStatus, string> = {
  all: "All",
  ongoing: "Ongoing",
  completed: "Completed",
  needs_review: "Needs review",
};
