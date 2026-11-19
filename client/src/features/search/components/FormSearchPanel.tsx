import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { SelectFormDropdown } from "@/components/ui/molecules/SelectFormDropdown";
import {
  SelectFormDropdownSheet,
  type SelectFormDropdownSheetOption,
} from "@/components/ui/molecules/SelectFormDropdownSheet";
import AdvancedSearchToggle from "@/components/ui/molecules/AdvancedSearchToggle";
import { Button } from "@/components/ui/atoms/Button";

const FORM_OPTIONS  = [
  { label: "實地探訪督導-事前預備工作紙", value: "visit-prep" },
  { label: "優勝模式小組督導範本", value: "group-template" },
  { label: "我的個人充權計劃", value: "improvement-plan" },
  { label: "優勢評估表", value: "advantage-evaluation" },
];

export const FormSearchPanel = () => {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<string | null>(null);
  const [isExpanded, setIsExpand] = useState(false);


  return (
    <View style={styles.container}>
      <View aria-label="Select form dropdown">
        <SelectFormDropdown
          label="表格"
          placeholder="選擇表格"
          valueLabel={FORM_OPTIONS.find((o) => o.value === form)?.label}
          open={open}
          onPress={() => setOpen(!open)}
        />
        <SelectFormDropdownSheet
          visible={open}
          title="選擇表格"
          options={FORM_OPTIONS}
          value={form}
          onSelect={setForm}
          onClose={() => setOpen(false)}
        />
      </View>
      <AdvancedSearchToggle
        onClick={() => setIsExpand(!isExpanded)}
        expanded={isExpanded}
      />
      <Button
        variant="primary"
        label="搜尋"
        iconPosition="left"
        icon="MagnifyingGlassIcon"
        iconVariant="micro"
        accessibilityLabel="Search Button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
});

export default FormSearchPanel;
