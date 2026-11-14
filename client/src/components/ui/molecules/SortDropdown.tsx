// components/ui/molecules/sort-dropdown.tsx
import { useState } from "react";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import {SelectFormDropdownSheet, type SelectFormDropdownSheetOption} from "@/components/ui/molecules/SelectFormDropdownSheet";
import { theme } from "@/theme/theme";

type SortDropdownProps<T extends string> = {
  options: SelectFormDropdownSheetOption<T>[];
  value: T;                       // a sort always has a value, so it isn't nullable
  onChange: (value: T) => void;
  sheetTitle?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function SortDropdown<T extends string>({
  options,
  value,
  onChange,
  sheetTitle = "排序方式",
  accessibilityLabel = "排序方式",
  disabled,
  style,
}: SortDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const currentLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <>
      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ text: currentLabel }}
        accessibilityState={{ disabled: !!disabled, expanded: open }}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
      >
        <AppText preset="body1" numberOfLines={1} style={styles.label}>
          {currentLabel}
        </AppText>
        <Icon
          name="ChevronUpDownIcon"
          variant="mini"
          size={16}
          color={theme.colors.secondaryText}
        />
      </Pressable>

      <SelectFormDropdownSheet
        visible={open}
        title={sheetTitle}
        options={options}
        value={value}
        onSelect={onChange}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: theme.spacing.xs,
    flexShrink: 1,                // lets long labels truncate in a crowded row
  },
  label: {
    flexShrink: 1,
    fontSize: theme.typography.body2,
    color: theme.colors.primaryText,
  },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
});

export default SortDropdown;

// type SortKey = "updated-desc" | "updated-asc" | "created-desc" | "created-asc";

// const SORT_OPTIONS: SelectFormDropdownSheetOption<SortKey>[] = [
//   { label: "最後更新 (新到舊)", value: "updated-desc" },
//   { label: "最後更新 (舊到新)", value: "updated-asc" },
//   { label: "建立日期 (新到舊)", value: "created-desc" },
//   { label: "建立日期 (舊到新)", value: "created-asc" },
// ];

// const [sort, setSort] = useState<SortKey>("updated-desc");

// <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />