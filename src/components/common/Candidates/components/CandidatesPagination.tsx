import { useCandidatesStore } from "@/store/candidatesStore";
import { Pagination } from "@/lib/types/candidates";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  pagination?: Pagination;
  isLoading?: boolean;
};

export default function CandidatesPagination({
  pagination,
  isLoading,
}: PaginationProps) {
  const filters = useCandidatesStore((s) => s.filters);
  const setFilters = useCandidatesStore((s) => s.setFilters);

  const { page } = filters;

  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        disabled={page <= 1 || isLoading}
        onClick={() => setFilters({ page: page - 1 })}
      >
        Previous
      </Button>

      <span>
        Page {page} of {totalPages}
      </span>

      <Button
        disabled={page >= totalPages || isLoading}
        onClick={() => setFilters({ page: page + 1 })}
      >
        Next
      </Button>
    </div>
  );
}
