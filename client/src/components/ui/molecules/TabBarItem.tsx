// components/ui/molecules/tab-bar-item.tsx
import { StyleSheet, Pressable , type PressableProps} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type TabBarItemProps = Omit<PressableProps, "style" | "children"> & {
  label: string;
  icon: IconName;
  focused?: boolean;
};

export const TabBarItem = ({
  label,
  icon,
  focused = false,
  ...props
}: TabBarItemProps) => {
  const focusedColor = focused
    ? theme.colors.primary
    : theme.colors.buttonInactive;
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityLabel="label"
      accessibilityState={{ selected: focused }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Icon name={icon} variant={focused ? "micro" : "outline"} size={24} color={focusedColor} />
      <AppText preset="tagline" style={{ color: focusedColor }}>
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: theme.spacing.sm,
  },
  pressed: { opacity: 0.6 },
});
