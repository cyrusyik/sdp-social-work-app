// features/search/components/search-panel.tsx
import { useState, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/atoms/Button";
import {AdvancedSearchToggle} from "@/components/ui/molecules/AdvancedSearchToggle";
import {SearchInput} from "@/components/ui/molecules/SearchInput";
import {SegmentedControl} from "@/components/ui/molecules/SegmentedControl";
import {SelectFormDropdown} from "@/components/ui/molecules/SelectFormDropdown";
import {SelectFormDropdownSheet, type SelectFormDropdownSheetOption} from "@/components/ui/molecules/SelectFormDropdownSheet";
import { theme } from "@/theme/theme";
import { TAB_OPTIONS } from "@/features/search/utils/constants";
import type { SearchTab } from "@/features/search/utils/types";

type SearchPanelProps = {
  tab: SearchTab;
  onTabChange: (tab: SearchTab) => void;

  formOptions: SelectFormDropdownSheetOption<string>[];
  formId: string | null;
  onFormChange: (id: string) => void;

  query: string;
  onQueryChange: (text: string) => void;

  advancedOpen: boolean;
  onAdvancedToggle: () => void;

  onSearch: () => void;
  loading?: boolean;
  children?: ReactNode;          // advanced filter fields, shown when expanded
};

export const SearchPanel = ({
  tab,
  onTabChange,
  formOptions,
  formId,
  onFormChange,
  query,
  onQueryChange,
  advancedOpen,
  onAdvancedToggle,
  onSearch,
  loading = false,
  children,
}: SearchPanelProps) => {
  // purely local UI state: the sheet is not part of the search state
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <View style={styles.container}>
      <SegmentedControl options={TAB_OPTIONS} value={tab} onChange={onTabChange} />

      {tab === "form" ? (
        <View>
          <SelectFormDropdown
            placeholder="選擇表格"
            valueLabel={formOptions.find((o) => o.value === formId)?.label}
            open={sheetOpen}
            onPress={() => setSheetOpen(true)}
          />
          <SelectFormDropdownSheet
            visible={sheetOpen}
            title="選擇表格"
            options={formOptions}
            value={formId}
            onSelect={onFormChange}
            onClose={() => setSheetOpen(false)}
          />
        </View>
      ) : (
        <SearchInput
          placeholder="搜尋案主姓名或英文名..."
          value={query}
          onChangeText={onQueryChange}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
      )}

      <AdvancedSearchToggle expanded={advancedOpen} onPress={onAdvancedToggle} />

      {advancedOpen ? <View style={styles.advanced}>{children}</View> : null}

      <Button label="搜尋" icon="MagnifyingGlassIcon" loading={loading} onPress={onSearch}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing.md, paddingBottom: theme.spacing.md },
  advanced: { gap: theme.spacing.md },
});

export default SearchPanel;