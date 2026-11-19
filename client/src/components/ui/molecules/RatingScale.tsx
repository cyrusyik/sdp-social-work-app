import { RatingOption } from "@/components/ui/atoms/RatingOption";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { Icon } from "../atoms/Icon";
import { AppText } from "../atoms/AppText";

export type RatingScaleOption<T extends number> = {
  value: T;
  selected: boolean;
};

type RatingScaleProps<T extends number> = {
  label: string;
  options: RatingScaleOption<T>[];
  value?: T | null; // controlled
  defaultValue?: T | null; // uncontrolled
  onChange?: (value: T | null) => void;
  disabled?: boolean;
};

export function RatingScale<T extends number>({
  label,
  options,
  value,
  defaultValue = null,
  onChange,
  disabled,
}: RatingScaleProps<T>) {
  const [internal, setInternal] = useState<T | null>(defaultValue);
  const current = value !== undefined ? value : internal;

  const handlePress = (v: T) => {
    const next = current === v ? v : v;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <View style={styles.container}>
      <AppText preset="body2">{label}</AppText>
      <View style={[styles.row, disabled && {backgroundColor: theme.colors.background}]}>
        {options.map((o) => (
          <RatingOption
            key={o.value}
            value={o.value}
            selected={disabled ? o.selected : current === o.value}
            onPress={disabled ? ()=>null : () => handlePress(o.value)}
            style={disabled && !o.selected && {backgroundColor: theme.colors.background}}
          />
        ))}
      </View>
      <View style={styles.scale}>
        <View style={styles.label}>
          <Icon
            name="HandThumbDownIcon"
            color={theme.colors.secondaryText}
            variant="micro"
            size={16}
          />
          <AppText
            preset="tagline"
            style={{ color: theme.colors.secondaryText }}
          >
            {"非常不滿意"}
          </AppText>
        </View>
        <View style={styles.label}>
          <Icon
            name="HandThumbUpIcon"
            color={theme.colors.secondaryText}
            variant="micro"
            size={16}
          />
          <AppText
            preset="tagline"
            style={{ color: theme.colors.secondaryText }}
          >
            {"非常滿意"}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.whiteActive,
    width: "100%",
    borderRadius: 999,
  },
  scale: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing.md,
  },
  label: {
    flexDirection: "row",
    alignContent: "center",
    gap: theme.spacing.xs,
  },
});

export default RatingScale;
