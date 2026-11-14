// components/ui/molecules/text-area-field.tsx
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Icon } from "@/components/ui/atoms/Icon";
import { theme } from "@/theme/theme";

type TextAreaFieldProps = Omit<
  TextInputProps,
  "multiline" | "style" | "editable"
> & {
  label?: string;
  hint?: string; // shown when the info icon is tapped
  helperText?: string;
  error?: string; // message; also turns the border red
  disabled?: boolean;
  minRows?: number; // starting height
  containerStyle?: StyleProp<ViewStyle>;
};

const LINE_HEIGHT = 22; // match your body1 line height

export const TextAreaField = ({
  label,
  hint,
  helperText,
  error,
  disabled,
  minRows = 1,
  value,
  onFocus,
  onBlur,
  containerStyle,
  ...props
}: TextAreaFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isFilled = !!value;
  const minHeight = Math.max(48, minRows * LINE_HEIGHT + theme.spacing.sm * 2);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label || hint ? (
        <View style={styles.labelRow}>
          {label ? <AppText preset="body2">{label}</AppText> : null}
          {hint ? (
            <Pressable
              onPress={() => setShowHint((v) => !v)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="More information"
              accessibilityState={{ expanded: showHint }}
            >
              <Icon
                name="InformationCircleIcon"
                variant="mini"
                size={16}
                color={theme.colors.strokeActive}
              />
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {hint && showHint ? (
        <View style={styles.hintBox}>
          <AppText preset="body2">{hint}</AppText>
        </View>
      ) : null}

      <TextInput
        {...props}
        value={value}
        multiline
        editable={!disabled}
        accessibilityLabel={props.accessibilityLabel ?? label}
        placeholderTextColor={theme.colors.secondaryText}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.input,
          { minHeight },
          (isFilled || isFocused) && styles.active,
          isFocused && styles.focused,
          !!error && styles.error, // after focused so error wins
          disabled && styles.disabled,
        ]}
      />

      <View style={styles.footer}>
        <View style={styles.footerMessage}>
          {error ? (
            <View style={styles.errorRow}>
              <Icon
                name="ExclamationCircleIcon"
                variant="mini"
                size={16}
                color={theme.colors.alert}
              />
              <AppText preset="alertMessage">{error}</AppText>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", gap: theme.spacing.sm },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  label: { fontSize: theme.typography.body2 },
  hintBox: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.inputFieldInactive,
  },
  hintText: { fontSize: theme.typography.body2 },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.inputFieldInactive,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body1,
    lineHeight: LINE_HEIGHT,
    textAlignVertical: "top", // Android: start at the top
    color: theme.colors.primaryText,
  },
  active: { backgroundColor: theme.colors.white },
  focused: { borderColor: theme.colors.strokeActive },
  error: { borderColor: theme.colors.alert },
  disabled: { opacity: 0.5 },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  footerMessage: { flex: 1 },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  errorText: {
    color: theme.colors.alert,
    fontSize: theme.typography.body2,
    flexShrink: 1,
  },
  helperText: {
    color: theme.colors.secondaryText,
    fontSize: theme.typography.body2,
  },
  count: {
    color: theme.colors.secondaryText,
    fontSize: theme.typography.body2,
  },
});

export default TextAreaField;
