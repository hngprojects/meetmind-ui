import { useMutation } from "@tanstack/react-query";
import { exportCandidates } from "@/lib/api/candidates";

export const useExportCandidates = () => {
  return useMutation({
    mutationFn: exportCandidates,
  });
};
