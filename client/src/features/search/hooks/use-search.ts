// features/search/hooks/use-search.ts
import { useCallback, useMemo, useState } from "react";
import { fetchResults } from "@/features/search/utils/api";
import type { SearchResult, SearchTab, SortKey, Status } from "@/features/search/utils/types";
import { filterByStatus, sortResults } from "@/features/search//utils/util";

export const useSearch = () => {
  // search inputs
  const [tab, setTab] = useState<SearchTab>("form");
  const [formId, setFormId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // results + display options
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [sort, setSort] = useState<SortKey>("updated-desc");

  // request state
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(false);

  const changeTab = useCallback((next: SearchTab) => {
    setTab(next);
    setResults([]);            // results from the other tab no longer apply
    setHasSearched(false);
    setError(false);
  }, []);

  const toggleAdvanced = useCallback(() => setAdvancedOpen((prev) => !prev), []);

  const search = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setResults(await fetchResults({ tab, formId, query }));
      setHasSearched(true);
    } catch {
      setResults([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [tab, formId, query]);

  // derived: never stored, so it can't go out of sync
  const visible = useMemo(
    () => sortResults(filterByStatus(results, status), sort),
    [results, status, sort]
  );

  return {
    tab, changeTab,
    formId, setFormId,
    query, setQuery,
    advancedOpen, toggleAdvanced,
    status, setStatus,
    sort, setSort,
    visible, loading, hasSearched, error,
    search,
  };
};