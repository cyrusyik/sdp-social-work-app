// features/search/mock-data.ts   (delete when the real API exists)
import type { SelectFormDropdownSheetOption } from "@/components/ui/molecules/SelectFormDropdownSheet";
import type { SearchResult } from "./types";

export const MOCK_FORM_OPTIONS: SelectFormDropdownSheetOption<string>[] = [
  { label: "實地探訪督導-事前預備工作紙", value: "visit-prep" },
  { label: "優勝模式小組督導範本", value: "group-template" },
  { label: "我的個人充權計劃", value: "role-plan" },
  { label: "優勢評估表", value: "advantage-eval" },
];

export const MOCK_RESULTS: SearchResult[] = [
  { id: "1", formId: "visit-prep", status: "ongoing", clientName: "陳大文 CHAN T.M.", formTitle: "實地探訪督導-事前預備工作紙", updatedAt: "2026-10-23", createdAt: "2026-10-23" },
  { id: "2", formId: "group-template", status: "closed", clientName: "陳大文 CHAN T.M.", formTitle: "優勝模式小組督導範本", updatedAt: "2026-10-23", createdAt: "2026-10-20" },
  { id: "3", formId: "role-plan", status: "ongoing", clientName: "李小明 LEE S.M.", formTitle: "我的個人角色計劃", updatedAt: "2026-10-18", createdAt: "2026-10-10" },
  { id: "4", formId: "advantage-eval", status: "closed", clientName: "王美玲 WONG M.L.", formTitle: "優勢評估表", updatedAt: "2026-09-30", createdAt: "2026-09-25" },
];