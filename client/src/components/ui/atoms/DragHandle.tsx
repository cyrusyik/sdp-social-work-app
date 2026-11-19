// components/ui/atoms/drag-handle.tsx
import { Pressable, StyleSheet, type PressableProps } from "react-native";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type DragHandleProps = Omit<PressableProps, "children" | "style"> & {
  color?: string;
};

export const DragHandle = ({
  color = theme.colors.secondaryText,
  disabled,
  ...props
}: DragHandleProps) => {
  return (
    <Pressable
      {...props}                       // onPressIn comes from the list's drag()
      disabled={disabled}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="拖曳排序"
      style={styles.handle}
    >
      <Icon name="Bars3Icon" variant="outline" size={24} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  handle: { padding: theme.spacing.xs },
});

export default DragHandle;