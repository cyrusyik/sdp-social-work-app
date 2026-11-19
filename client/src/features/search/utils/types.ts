import { ResultProps } from "@/components/ui/molecules/ResultListItem";

export type SearchTab = "form" | "client";
export type Status = "closed" | "ongoing";
export type SortKey = "updated-desc" | "updated-asc" | "created-desc" | "created-asc";

export type SearchResult = ResultProps & {
  status: Status;
  formId: string;
};

export type SearchParams = {
  tab: SearchTab;
  formId: string | null;
  query: string;
};