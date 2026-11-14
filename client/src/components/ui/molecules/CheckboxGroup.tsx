// components/ui/molecules/checkbox-group.tsx
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { AppCheckbox } from "@/components/ui/atoms/AppCheckBox";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

export type CheckboxOption<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type CheckboxGroupProps<T extends string> = {
  options: CheckboxOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  label?: string;
  helperText?: string;
  error?: string;                  // message; also turns the boxes red
  disabled?: boolean;
  maxSelections?: number;          // once reached, unchecked options are disabled
  direction?: "column" | "row";    // row wraps onto multiple lines
  containerStyle?: StyleProp<ViewStyle>;
};

export function CheckboxGroup<T extends string>({
  options,
  value,
  onChange,
  label,
  helperText,
  error,
  disabled,
  maxSelections,
  direction = "column",
  containerStyle,
}: CheckboxGroupProps<T>) {
  const limitReached = maxSelections !== undefined && value.length >= maxSelections;

  const toggle = (v: T) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    // keep the order of the options, not the order of the taps
    onChange(options.map((o) => o.value).filter((x) => next.includes(x)));
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <AppText preset="body1" style={styles.label}>{label}</AppText> : null}

      <View
        accessibilityRole="none"
        accessibilityLabel={label}
        style={[styles.options, direction === "row" ? styles.row : styles.column]}
      >
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <AppCheckbox
              key={o.value}
              label={o.label}
              checked={checked}
              error={!!error}
              disabled={disabled || o.disabled || (!checked && limitReached)}
              onPress={() => toggle(o.value)}
            />
          );
        })}
      </View>

      {error ? (
        <View style={styles.errorRow}>
          <Icon name="ExclamationCircleIcon" variant="mini" size={16} color={theme.colors.alert} />
          <AppText preset="alertMessage" style={styles.errorText}>{error}</AppText>
        </View>
      ) : helperText ? (
        <AppText preset="body1" style={styles.helperText}>{helperText}</AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%", gap: theme.spacing.sm },
  label: { fontSize: theme.typography.body2 },
  options: { gap: theme.spacing.md },
  column: { flexDirection: "column" },
  row: { flexDirection: "row", flexWrap: "wrap", columnGap: theme.spacing.lg },
  errorRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.xs },
  errorText: { color: theme.colors.alert, fontSize: theme.typography.body2, flexShrink: 1 },
  helperText: { color: theme.colors.secondaryText, fontSize: theme.typography.body2 },
});

export default CheckboxGroup;