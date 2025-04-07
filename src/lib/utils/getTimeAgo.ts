import { formatDistanceToNow } from "date-fns";

export function getTimeAgo(date?: string | Date): string {
  if (!date) return "Unknown date";
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? "Unknown date"
    : formatDistanceToNow(parsedDate, { addSuffix: true });
}
