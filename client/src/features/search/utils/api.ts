// features/search/api.ts   (swap the body for your real request later)
import { MOCK_RESULTS } from "./mock-data";
import type { SearchParams, SearchResult } from "./types";

export const fetchResults = async ({ tab, formId, query }: SearchParams): Promise<SearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));   // fake latency

  const q = query.trim().toLowerCase();
  return MOCK_RESULTS.filter((r) =>
    tab === "forms"
      ? !formId || r.formId === formId
      : !q || r.clientName.toLowerCase().includes(q)
  );
};