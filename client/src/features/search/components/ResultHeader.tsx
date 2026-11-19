// features/search/components/results-toolbar.tsx
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { ChipGroup } from "@/components/ui/molecules/ChipGroup";
import {SortDropdown} from "@/components/ui/molecules/SortDropdown";
import { theme } from "@/theme/theme";
import { SORT_OPTIONS, STATUS_OPTIONS } from "@/features/search/utils/constants";
import type { SortKey, Status } from "@/features/search/utils/types";

type ResultsToolbarProps = {
  statuses: Status[];
  onStatusesChange: (value: Status[]) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  count: number;
};

export const ResultHeader = ({
  statuses,
  onStatusesChange,
  sort,
  onSortChange,
  count,
}: ResultsToolbarProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <ChipGroup
        multiple
        options={STATUS_OPTIONS}
        value={statuses}
        onChange={onStatusesChange}
        style={styles.chips}
      />
      <SortDropdown options={SORT_OPTIONS} value={sort} onChange={onSortChange} />
    </View>
    <AppText preset="tagline" style={{color: theme.colors.buttonInactive}}>已顯示 {count} 項結果</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: { gap: theme.spacing.sm, paddingBottom: theme.spacing.sm },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: theme.spacing.sm },
  chips: { flexShrink: 1 },
  count: { fontSize: theme.typography.caption, color: theme.colors.textSecondary },
});

export default ResultHeader;