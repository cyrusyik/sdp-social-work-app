// components/ui/molecules/segmented-control.tsx
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

export type SegmentOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const RADIUS = 8;
const OPTION_HEIGHT = 36;

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  disabled,
  style,
}: SegmentedControlProps<T>) {
  const selectedIndex = Math.max(
    options.findIndex((o) => o.value === value),
    0
  );

  const [innerWidth, setInnerWidth] = useState(0);
  const segmentWidth = options.length > 0 ? innerWidth / options.length : 0;

  const translateX = useRef(new Animated.Value(0)).current;
  const hasLaidOut = useRef(false);

  useEffect(() => {
    if (segmentWidth === 0) return;
    const toValue = selectedIndex * segmentWidth;

    if (!hasLaidOut.current) {
      translateX.setValue(toValue);        // first layout: jump, no animation
      hasLaidOut.current = true;
      return;
    }
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, segmentWidth, translateX]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setInnerWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.outer, disabled && styles.disabled, style]}
    >
      <View style={styles.inner} onLayout={handleLayout}>
        {segmentWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.indicator,
              { width: segmentWidth, transform: [{ translateX }] },
            ]}
          />
        ) : null}

        {options.map((option, index) => {
          const selected = index === selectedIndex;
          return (
            <Pressable
              key={option.value}
              disabled={disabled}
              onPress={() => {
                if (!selected) onChange(option.value);
              }}
              accessibilityRole="tab"
              accessibilityLabel={option.label}
              accessibilityState={{ selected, disabled: !!disabled }}
              style={styles.option}
            >
              <AppText
                preset={selected ? "body2Bold" : "body2"}
                numberOfLines={1}
                style={[styles.label, selected && styles.labelSelected]}
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: RADIUS,                     // outer box radius
    backgroundColor: theme.colors.inputFieldInactive,
  },
  inner: {
    flexDirection: "row",
    height: OPTION_HEIGHT,
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: OPTION_HEIGHT,
    borderRadius: RADIUS,                     // option radius
    backgroundColor: theme.colors.white,
  },
  option: {
    flex: 1,
    height: OPTION_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS,
  },
  label: {
    fontSize: theme.typography.body2,
    color: theme.colors.secondaryText,
  },
  labelSelected: {
    color: theme.colors.primary,
  },
  disabled: { opacity: 0.5 },
});

export default SegmentedControl;

// type SearchTab = "forms" | "clients";

//   const TABS: SegmentOption<SearchTab>[] = [
//     { label: "表格", value: "forms" },
//     { label: "案主", value: "clients" },
//   ];

// const [tab, setTab] = useState<SearchTab>("forms");

//<SegmentedControl options={TABS} value={tab} onChange={setTab} />