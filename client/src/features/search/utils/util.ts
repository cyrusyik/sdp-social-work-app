// features/search/utils.ts
import type { SearchResult, SortKey, Status } from "./types";

export const filterByStatus = (items: SearchResult[], status: Status | null) =>
  status === null ? items : items.filter((r) => r.status === status);

export const sortResults = (items: SearchResult[], sort: SortKey) => {
  const [field, direction] = sort.split("-") as ["updated" | "created", "asc" | "desc"];
  const key = field === "updated" ? "updatedAt" : "createdAt";

  return [...items].sort((a, b) => {
    const diff = new Date(a[key]).getTime() - new Date(b[key]).getTime();
    return direction === "asc" ? diff : -diff;
  });
};