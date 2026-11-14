import { Chip } from "@/components/ui/atoms/Chip";
import { useState } from "react";
import { View , StyleSheet} from "react-native";
import { theme } from "@/theme/theme";

type ChipOption<T extends string> = {
  value: T;
  label: string;
};

type ChipGroupProps<T extends string> = {
  options: ChipOption<T>[];
  value?: T | null;                       // controlled
  defaultValue?: T | null;                // uncontrolled
  onChange?: (value: T | null) => void;
};

export function ChipGroup<T extends string>({ options, value, defaultValue = null, onChange }: ChipGroupProps<T>) {
  const [internal, setInternal] = useState<T | null>(defaultValue);
  const current = value !== undefined ? value : internal;

  const handlePress = (v: T) => {
    const next = current === v ? null : v;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <View style={styles.row}>
      {options.map((o) => (
        <Chip key={o.value} label={o.label} selected={current === o.value} onPress={() => handlePress(o.value)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    alignContent: 'center',
    gap: theme.spacing.sm,
  }
})