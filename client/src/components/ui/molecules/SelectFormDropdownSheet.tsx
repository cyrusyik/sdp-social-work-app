// components/ui/organisms/select-sheet.tsx
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import { IconButton } from "@/components/ui/atoms/IconButton";
import { theme } from "@/theme/theme";

export type SelectFormDropdownSheetOption<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type SelectFormDropdownSheetProps<T extends string> = {
  visible: boolean;
  title?: string;
  options: SelectFormDropdownSheetOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  onClose: () => void;
  emptyText?: string;
};

export function SelectFormDropdownSheet<T extends string>({
  visible,
  title,
  options,
  value,
  onSelect,
  onClose,
  emptyText = "沒有選項",
}: SelectFormDropdownSheetProps<T>) {
  const { height: windowHeight } = useWindowDimensions();

  // Keep the Modal mounted until the close animation finishes
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  const handleSelect = (v: T) => {
    onSelect(v);
    onClose();
  };

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"        // we animate manually so the backdrop only fades
      statusBarTranslucent        // Android: backdrop covers the status bar
      onRequestClose={onClose}    // Android back button
    >
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <AppText preset="body1">{title}</AppText>
            <IconButton
              icon="XMarkIcon"
              size="sm"
              accessibilityLabel="Close"
              onPress={onClose}
            />
          </View>

          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            style={styles.list}                 // flexGrow: 0 lets the sheet hug short lists
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <AppText preset="body1">{emptyText}</AppText>
            }
            renderItem={({ item }) => {
              const selected = item.value === value;
              return (
                <Pressable
                  disabled={item.disabled}
                  onPress={() => handleSelect(item.value)}
                  accessibilityRole="radio"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected, disabled: !!item.disabled }}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.pressed,
                    item.disabled && styles.disabled,
                  ]}
                >
                  <AppText
                    preset="body1"
                    style={[styles.optionText, selected && styles.optionTextSelected]}
                  >
                    {item.label}
                  </AppText>
                  {selected ? (
                    <Icon
                      name="CheckIcon"
                      variant="mini"
                      size={20}
                      color={theme.colors.primary}
                    />
                  ) : null}
                </Pressable>
              );
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "flex-end" },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    maxHeight: "70%",
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,            // stand-in for the safe-area inset (home indicator)
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.stroke,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  title: { flex: 1, fontSize: theme.typography.body1 },

  list: { flexGrow: 0 },
  listContent: { paddingHorizontal: theme.spacing.md },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.stroke },

  option: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  optionText: { flex: 1, fontSize: theme.typography.body1 },
  optionTextSelected: { color: theme.colors.primary, fontWeight: "600" },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
  empty: {
    textAlign: "center",
    paddingVertical: theme.spacing.lg,
    color: theme.colors.secondaryText,
  },
});

export default SelectFormDropdownSheet;