// components/ui/molecules/select-field.tsx
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type SelectFieldProps = Omit<PressableProps, "style" | "children"> & {
  label?: string;
  placeholder?: string;
  valueLabel?: string;      // display text of the selected option; empty = show placeholder
  helperText?: string;
  error?: string;           // message; also turns the border red
  disabled?: boolean;
  open?: boolean;           // true while the picker is showing
  containerStyle?: StyleProp<ViewStyle>;
};

export const SelectFormDropdown = ({
  label,
  placeholder = "請選擇",
  valueLabel,
  helperText,
  error,
  disabled,
  open = false,
  containerStyle,
  ...props
}: SelectFieldProps) => {
  const hasValue = !!valueLabel;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <AppText preset="body1">{label}</AppText> : null}

      <Pressable
        {...props}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: hasValue ? valueLabel : placeholder }}
        accessibilityState={{ disabled: !!disabled, expanded: open }}
        style={({ pressed }) => [
          styles.trigger,
          (hasValue || open) && styles.active,
          open && styles.open,
          !!error && styles.error,          // after open so error wins
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <AppText
          numberOfLines={1}
          preset="body1"
          style={[styles.value, !hasValue && styles.placeholder]}
        >
          {hasValue ? valueLabel : placeholder}
        </AppText>
        <Icon
          name={open ? "ChevronUpIcon" : "ChevronDownIcon"}
          variant="mini"
          size={20}
          color={theme.colors.primaryText}
        />
      </Pressable>

      {error ? (
        <View style={styles.errorRow}>
          <Icon
            name="ExclamationCircleIcon"
            variant="mini"
            size={16}
            color={theme.colors.alert}
          />
          <AppText preset="body1" style={styles.errorText}>{error}</AppText>
        </View>
      ) : helperText ? (
        <AppText preset="alertMessage" style={styles.helperText}>{helperText}</AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", gap: theme.spacing.xs },
  label: { fontSize: theme.typography.body2 },

  trigger: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.inputFieldInactive,
  },
  active: { backgroundColor: theme.colors.white },
  open: { borderColor: theme.colors.strokeActive },
  error: { borderColor: theme.colors.alert },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },

  value: {
    flex: 1,                       // pushes the chevron to the right edge
    fontSize: theme.typography.body1,
    color: theme.colors.primaryText,
  },
  placeholder: { color: theme.colors.secondaryText },

  errorRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.xs },
  errorText: { color: theme.colors.alert, fontSize: theme.typography.body2, flexShrink: 1 },
  helperText: { color: theme.colors.secondaryText, fontSize: theme.typography.body2 },
});

export default SelectFormDropdown;

// const [open, setOpen] = useState(false);
//   const [form, setForm] = useState<string | null>(null);

//   const OPTIONS = [
//     { label: "實地探訪督導-事前預備工作紙", value: "visit-prep" },
//     { label: "優勝模式小組督導範本", value: "group-template" },
//     { label: "我的個人充權計劃", value: "improvement-plan" },
//     { label: "優勢評估表", value: "advantage-evaluation" },
//   ];

// <SelectFormDropdown label="表格" placeholder="選擇表格" valueLabel={OPTIONS.find((o) => o.value === form)?.label} open={open} onPress={() => setOpen(!open)} />
// <SelectFormDropdownSheet
//   visible={open}
//   title="選擇表格"
//   options={OPTIONS}
//   value={form}
//   onSelect={setForm}
//   onClose={() => setOpen(false)}
// />