import { StyleSheet, Text, type TextProps } from "react-native";
import { typography } from "@/theme/typography";
import { theme } from "@/theme/theme";

const FONTS = {
  hkRegular: "NotoSansHK-Regular",
  hkSemiBold: "NotoSansHK-SemiBold",
  hkBold: "NotoSansHK-Bold",
  monoRegular: "NotoSansMono-Regular",
} as const;

const presets = StyleSheet.create({
  
  h1: {
    fontSize: typography.h1,
    fontFamily: FONTS.hkSemiBold,
    letterSpacing: -0.5,
    color: theme.colors.primaryText,
  },
  h2: {
    fontSize: typography.h2,
    fontFamily: FONTS.hkBold,
    letterSpacing: -0.5,
    color: theme.colors.primaryText,
  },
  h3: {
    fontSize: typography.h3,
    fontFamily: FONTS.hkSemiBold,
    letterSpacing: -0.5,
    color: theme.colors.primaryText,
  },
  h4: {
    fontSize: typography.h4,
    fontFamily: FONTS.hkSemiBold,
    letterSpacing: -0.5,
    color: theme.colors.primaryText,
  },
  mainButton: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkBold,
    color: theme.colors.primaryText,
  },
  secondaryButton: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkBold,
    color: theme.colors.white,
  },
  body1: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.primaryText,
  },
  body1Bold: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkBold,
    color: theme.colors.primaryText,
  },
  body1Mono: {
    fontSize: typography.body1,
    fontFamily: FONTS.monoRegular,
    color: theme.colors.primaryText,
  },
  body2: {
    fontSize: typography.body2,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.primaryText,
  },
  body2Bold: {
    fontSize: typography.body2,
    fontFamily: FONTS.hkBold,
    color: theme.colors.primaryText,
  },
  tagline: {
    fontSize: typography.tagline,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.primaryText,
  },
  taglineBold: {
    fontSize: typography.tagline,
    fontFamily: FONTS.hkBold,
    color: theme.colors.primaryText,
  },
  taglineMono: {
    fontSize: typography.tagline,
    fontFamily: FONTS.monoRegular,
    color: theme.colors.primaryText,
  },
  placeholderInactive: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.placeholderInactive,
  },
  placeholderActive: {
    fontSize: typography.body1,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.placeholderActive,
  },
  alertMessage: {
    fontSize: typography.body2,
    fontFamily: FONTS.hkRegular,
    color: theme.colors.alert,
  }
});

interface CustomTextProps extends TextProps {
  preset: keyof typeof presets;
}

export const AppText = ({
  preset,
  style,
  children,
  ...props
}: CustomTextProps) => {
  const presetStyle = presets[preset] || presets.body1;

  return (
    <Text style={[presetStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
