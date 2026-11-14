// components/ui/atoms/Radio.tsx
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

type RadioProps = Omit<PressableProps, "style" | "children"> & {
  label?: string;
  selected?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OUTER = 20;
const INNER = 10;

export const Radio = ({
  label,
  selected = false,
  error = false,
  disabled,
  style,
  ...props
}: RadioProps) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled: !!disabled }}
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
          styles.outer,
          selected && styles.outerSelected,
          error && styles.outerError,
        ]}
      >
        {selected ? <View style={styles.inner} /> : null}
      </View>
      {label ? <AppText preset="body1">{label}</AppText> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  outer: {
    width: OUTER,
    height: OUTER,
    borderRadius: OUTER / 2,
    borderWidth: 2,
    borderColor: theme.colors.stroke,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  outerSelected: { borderColor: theme.colors.primary },
  outerError: { borderColor: theme.colors.alert },
  inner: {
    width: INNER,
    height: INNER,
    borderRadius: INNER / 2,
    backgroundColor: theme.colors.primary,
  },
  label: { flexShrink: 1, fontSize: theme.typography.body1 },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
});

export default Radio;
