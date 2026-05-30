export function getCandidateInitials(candidateName: string): string {
  return (
    candidateName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "N/A"
  );
}
