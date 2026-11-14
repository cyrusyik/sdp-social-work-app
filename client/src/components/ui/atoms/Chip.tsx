import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

type ChipProps = Omit<PressableProps, "style" | "children"> & {
  label: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Chip = ({
  label,
  selected = false,
  disabled,
  style,
  ...props
}: ChipProps) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed && {
          backgroundColor: selected ? theme.colors.primaryActive : theme.colors.whiteActive,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText preset="body2" style={selected ? styles.textSelected : styles.textUnselected}>
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: theme.spacing.xs,
    borderWidth: 1,
    borderRadius: 999,
    height: 36,
    paddingHorizontal: theme.spacing.md,
  },
  unselected: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.stroke,
  },
  textSelected: {
    color: theme.colors.white,
  },
  textUnselected: {
    color: theme.colors.primaryText,
  },
  disabled: { opacity: 0.4 },
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});

export default Chip;
