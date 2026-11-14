import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
} from "react-native";

import { AppText } from "@/components/ui/atoms/AppText";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type ButtonProps = PressableProps & {
  label: string;
  variant?: "primary" | "secondary" | "alert" | "alert-outline" | "inline";
  icon?: IconName;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  iconVariant?: "outline" | "solid" | "mini" | "micro";
  accessibilityRole?: string;
  accessibilityLabel: string;
  accessibilityState?: string;
};

export function Button({
  label,
  variant = "primary",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = true,
  disabled,
  style,
  iconVariant,
  accessibilityRole,
  accessibilityLabel,
  accessibilityState,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonIcon = loading ? null : icon;
  const fontPreset = variant === "inline" ? "body1" : "mainButton";
  const iconColor =
    variant === "alert-outline"
      ? theme.colors.alert
      : variant === "secondary"
        ? theme.colors.primaryText
        : variant === "inline"
          ? theme.colors.primaryText
          : theme.colors.white;
  const buttonBackgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "alert"
        ? theme.colors.alert
        : variant === "inline"
          ? "none"
          : theme.colors.white;
  const buttonPaddingHorizontal = variant === "inline" ? 0 : 16;
  const textDecorationLine = variant === "inline" ? "underline" : "none";
  const textMarginBlock = variant === "inline" ? 0 : 12;
  const buttonBorderWidth = variant === "inline" ? 0 : 1;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          minHeight: 48,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          flexDirection: "row",
          gap: theme.spacing.sm,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: buttonBorderWidth,
          borderRadius: theme.radius.md,
          paddingHorizontal: buttonPaddingHorizontal,
          opacity: isDisabled
            ? 0.56
            : pressed
              ? theme.motion.opacity.pressed
              : 1,
          backgroundColor: buttonBackgroundColor,
        },
        style as object,
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      {...props}
    >
      {buttonIcon && iconPosition === "left" ? (
        <Icon
          name={buttonIcon}
          color={iconColor}
          variant={iconVariant}
          size={24}
        />
      ) : null}
      <AppText
        preset={fontPreset}
        style={{
          color: iconColor,
          marginBlock: textMarginBlock,
          textDecorationLine: textDecorationLine,
        }}
      >
        {label}
      </AppText>
      {buttonIcon && iconPosition === "right" ? (
        <Icon
          name={buttonIcon}
          color={iconColor}
          variant={iconVariant}
          size={24}
        />
      ) : null}
    </Pressable>
  );
}
