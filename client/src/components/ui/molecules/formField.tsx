import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { Input } from "@/components/ui/atoms/Input";
import { theme } from "@/theme/theme";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { useState } from "react";

type InputProps = TextInputProps & {
  placeholder: string;
  errorMessage?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  error?: boolean;
  label?: string;
  icon?: IconName;
  iconPosition?: string;
  iconVariant?: "outline" | "solid" | "mini" | "micro";
};

export const FormField = ({
  placeholder,
  errorMessage,
  value,
  onChangeText,
  label,
  containerStyle,
  error,
  icon,
  iconPosition,
  iconVariant,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value;

  return (
    <View
      style={{
        width: "100%",
        gap: theme.spacing.xs,
      }}
    >
      {label ? <AppText preset="body1">{label}</AppText> : null}

      <Input
        {...props}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
        icon={icon}
        iconPosition={iconPosition}
        iconVariant={iconVariant}
      />
      <View style={{ height: 20 }}>
        {error ? (
          <View style={style.errorMessageContainer}>
            <Icon
              name="ExclamationTriangleIcon"
              variant="mini"
              color={theme.colors.alert}
              size={24}
            />
            <AppText preset="body2" style={style.errorMessage}>
              {errorMessage}
            </AppText>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  label: {},
  focusedDefault: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.strokeActive,
  },
  unfocusedDefault: {},
  unfocusedFilled: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.stroke,
  },
  focusedFilled: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.strokeActive,
  },
  input: {
    height: 48,
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: 16,
    overflow: "hidden",
    backgroundColor: theme.colors.inputFieldInactive,
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

export default FormField;
