import type { CandidateStatus } from "../types";

export const STATUS_LABELS: Record<"all" | CandidateStatus, string> = {
  all: "All",
  ongoing: "Ongoing",
  completed: "Completed",
  needs_review: "Needs review",
};
