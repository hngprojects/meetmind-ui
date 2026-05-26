export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const formatRelativeDate = (date: string | Date) => {
  const now = new Date();
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor(
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diff < 0) return formatDate(d);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;

  return formatDate(date);
};
