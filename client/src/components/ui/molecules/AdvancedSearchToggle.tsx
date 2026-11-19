// components/ui/molecules/advanced-search-toggle.tsx
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type AdvancedSearchToggleProps = Omit<PressableProps, "style" | "children"> & {
  expanded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const AdvancedSearchToggle = ({
  expanded = false,
  disabled,
  style,
  ...props
}: AdvancedSearchToggleProps) => {
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Pressable
      {...props}
      disabled={disabled}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={"進階搜尋"}
      accessibilityState={{ expanded, disabled: !!disabled }}
      style={({ pressed }) => [
        styles.trigger,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText preset="body2"style={styles.label}>{"進階搜尋"}</AppText>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Icon
          name="ChevronDownIcon"
          variant="mini"
          size={20}
          color={theme.colors.primary}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",        // sits at the right edge under the input
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.body2,
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
});

export default AdvancedSearchToggle;