// features/search/constants.ts
import type { ChipOption } from "@/components/ui/molecules/ChipGroup";
import type { SegmentOption } from "@/components/ui/molecules/SegmentedControl";
import type { SelectFormDropdownSheetOption } from "@/components/ui/molecules/SelectFormDropdownSheet";
import type { SearchTab, SortKey, Status } from "./types";

export const TAB_OPTIONS: SegmentOption<SearchTab>[] = [
  { label: "表格", value: "forms" },
  { label: "案主", value: "clients" },
];

export const STATUS_OPTIONS: ChipOption<Status>[] = [
  { label: "已結案", value: "closed" },
  { label: "跟進中", value: "ongoing" },
];

export const SORT_OPTIONS: SelectFormDropdownSheetOption<SortKey>[] = [
  { label: "最後更新 (新到舊)", value: "updated-desc" },
  { label: "最後更新 (舊到新)", value: "updated-asc" },
  { label: "建立日期 (新到舊)", value: "created-desc" },
  { label: "建立日期 (舊到新)", value: "created-asc" },
];