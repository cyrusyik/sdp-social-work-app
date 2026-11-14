import { RatingOption } from "@/components/ui/atoms/RatingOption";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { Icon } from "../atoms/Icon";
import { AppText } from "../atoms/AppText";

type ChipOption<T extends number> = {
  value: T;
};

type RatingScaleProps<T extends number> = {
  options: ChipOption<T>[];
  value?: T | null; // controlled
  defaultValue?: T | null; // uncontrolled
  onChange?: (value: T | null) => void;
};

export function RatingScale<T extends number>({
  options,
  value,
  defaultValue = null,
  onChange,
}: RatingScaleProps<T>) {
  const [internal, setInternal] = useState<T | null>(defaultValue);
  const current = value !== undefined ? value : internal;

  const handlePress = (v: T) => {
    const next = current === v ? v : v;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <View>
      <View style={styles.row}>
        {options.map((o) => (
          <RatingOption
            key={o.value}
            value={o.value}
            selected={current === o.value}
            onPress={() => handlePress(o.value)}
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
    margin: theme.spacing.md,
  },
  label: {
    flexDirection: "row",
    alignContent: "center",
    gap: theme.spacing.xs,
  },
});

export default RatingScale;
