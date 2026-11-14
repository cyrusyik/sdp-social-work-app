// components/ui/atoms/checkbox.tsx
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type CheckboxProps = Omit<PressableProps, "style" | "children"> & {
  label?: string;
  checked?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
};

const BOX = 20;

export const AppCheckbox = ({
  label,
  checked = false,
  error = false,
  disabled,
  style,
  ...props
}: CheckboxProps) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled: !!disabled }}
      hitSlop={8}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View
        style={[
          styles.box,
          checked && styles.boxChecked,
          error && styles.boxError,        // after checked so error wins
        ]}
      >
        {checked ? (
          <Icon name="CheckIcon" variant="mini" size={16} color={theme.colors.white} />
        ) : null}
      </View>
      {label ? <AppText preset="body1" style={styles.label}>{label}</AppText> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  box: {
    width: BOX,
    height: BOX,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.stroke,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  boxError: { borderColor: theme.colors.alert },
  label: { flexShrink: 1, fontSize: theme.typography.body1 },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
});

export default AppCheckbox;