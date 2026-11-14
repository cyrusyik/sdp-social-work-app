import { ActivityIndicator, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/theme";

type SpinnerProps = {
  size?: "sm" | "lg";
  color?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export const Spinner = ({
  size = "sm",
  color = theme.colors.primary,
  accessibilityLabel = "Loading",
  style,
}: SpinnerProps) => {
  return (
    <ActivityIndicator
      size={size === "sm" ? "small" : "large"}
      color={color}
      accessibilityLabel={accessibilityLabel}
      style={style}
    />
  );
};

export default Spinner;