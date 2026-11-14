import { useState } from "react";
import { theme } from "@/theme/theme";
import { Checkbox, CheckboxProps } from "expo-checkbox";
import { LayoutChangeEvent, StyleSheet, View, Pressable } from "react-native";
import { AppText } from "./AppText";

type AppCheckboxProps = CheckboxProps & {
  label?: string;
  disabled?: boolean;
  accessibilityRole?: string;
  accessibilityLabel: string;
  accessibilityState?: string;
};

export const AppCheckbox = ({
  label,
  disabled,
  accessibilityRole,
  accessibilityLabel,
  accessibilityState,
  ...props
}: AppCheckboxProps) => {
  const [isChecked, setChecked] = useState(false);
  const [verticalSlop, setVerticalSlop] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    const targetHeight = 48;
    const neededSlop = Math.max(0, (targetHeight - height) / 2);
    setVerticalSlop(neededSlop);
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={{ top: verticalSlop, bottom: verticalSlop }}
      onPress={() => setChecked((checked) => !checked)}
      style={styles.container}
      onLayout={handleLayout}
    >
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? theme.colors.primary : undefined}
      />
      {label ? (
        <AppText preset="body1" style={{ flex: 1 }}>
          {label}
        </AppText>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 0.5,
    borderColor: theme.colors.stroke,
    backgroundColor: theme.colors.white,
    transitionDuration: theme.motion.duration.fast,
    transitionProperty: "ease-out",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
});

export default AppCheckbox;
