import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { IconButton } from "@/components/ui/atoms/iconButton";
import { theme } from "@/theme/theme";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { useState } from "react";

type InputProps = TextInputProps & {
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  error?: boolean;
  disabled?: boolean;
  pressableIcon?: boolean;
  errorMessage?: string;
};

export const PasswordInput = ({
  value,
  onChangeText,
  containerStyle,
  error,
  errorMessage,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isFilled = value;

  return (
    <View
      style={{
        width: "100%",
        gap: theme.spacing.xs,
      }}
    >
      <AppText preset="body1">{"輸入你的密碼"}</AppText>
      <View
        style={[
          styles.container,
          (isFilled || isFocused) && styles.active,
          isFocused && styles.focused,
          error && styles.errorStyle,
        ]}
      >
        <TextInput
          {...props}
          style={[styles.textInput]}
          placeholder="輸入你的密碼"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!isPasswordVisible}
        />
        {isPasswordVisible ? (
          <IconButton
            icon="EyeIcon"
            size="lg"
            variant="ghost"
            accessibilityLabel="Hide password"
            onPress={() => setIsPasswordVisible(false)}
            iconColor={theme.colors.primaryText}
          />
        ) : (
          <IconButton
            icon="EyeSlashIcon"
            size="lg"
            variant="ghost"
            accessibilityLabel="Show password"
            onPress={() => setIsPasswordVisible(true)}
            iconColor={theme.colors.primaryText}
            iconVariant="micro"
          />
        )}
      </View>
      <View style={{ height: 20 }}>
        {error ? (
          <View style={styles.errorMessageContainer}>
            <Icon
              name="ExclamationTriangleIcon"
              variant="mini"
              color={theme.colors.alert}
              size={24}
            />
            <AppText preset="body2" style={styles.errorMessage}>
              {errorMessage}
            </AppText>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  active: { backgroundColor: theme.colors.white },
  focused: { borderColor: theme.colors.strokeActive },
  error: { borderColor: theme.colors.alert },
  disabled: { opacity: 0.5 },
  container: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    backgroundColor: theme.colors.inputFieldInactive,
  },
  textInput: {
    flex: 1,
    minWidth: 0,
    fontSize: theme.typography.body1,
    padding: 0,
  },
  errorStyle: {
    borderColor: theme.colors.alert,
    borderWidth: 1,
  },
  errorMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  errorMessage: {
    color: theme.colors.alert,
  },
});

export default PasswordInput;
