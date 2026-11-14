import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

type RatingOptionProps = Omit<PressableProps, "style" | "children"> & {
  value: number;
  selected?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const RatingOption = ({
  value,
  selected = false,
  size = 40,
  disabled,
  style,
  ...props
}: RatingOptionProps) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={`${value}`}
      accessibilityState={{ selected, disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: size / 2, margin: 4 },
        selected ? styles.selected : styles.unselected,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText
        preset="body1"
        style={[
          { color: selected ? theme.colors.white : theme.colors.primaryText },
        ]}
      >
        {value}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  unselected: {
    backgroundColor: theme.colors.whiteActive,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
});

export default RatingOption;
