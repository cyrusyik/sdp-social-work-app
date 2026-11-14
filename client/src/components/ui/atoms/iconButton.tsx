// components/ui/atoms/icon-button.tsx
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type IconButtonVariant = "primary" | "secondary" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

type IconButtonProps = Omit<PressableProps, "style" | "children"> & {
  icon: IconName;
  accessibilityLabel: string; // required: there is no visible text
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  iconVariant?: "outline" | "solid" | "mini" | "micro";
  iconColor?: string; // overrides the variant color
  style?: StyleProp<ViewStyle>;
};

const DIMENSIONS: Record<IconButtonSize, { box: number; icon: number }> = {
  sm: { box: 32, icon: 16 },
  md: { box: 40, icon: 20 },
  lg: { box: 48, icon: 24 },
};

export const IconButton = ({
  icon,
  accessibilityLabel,
  variant = "ghost",
  size = "md",
  iconVariant = "outline",
  iconColor,
  disabled,
  style,
  ...props
}: IconButtonProps) => {
  const { box, icon: iconSize } = DIMENSIONS[size];

  const resolvedIconColor =
    iconColor ??
    (variant === "primary" ? theme.colors.white : theme.colors.primary);

  // Keep the touch target at least 44x44 even for small buttons
  const hitSlop = Math.max(0, Math.ceil((44 - box) / 2));

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        { width: box, height: box, borderRadius: box / 2 },
        variantStyles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Icon
        name={icon}
        variant={iconVariant}
        size={iconSize}
        color={resolvedIconColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: theme.colors.primary },
  secondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
  },
  ghost: { backgroundColor: "transparent" },
});

export default IconButton;
