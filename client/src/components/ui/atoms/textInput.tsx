import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import { AppText } from '@/components/ui/atoms/app-text';
import { theme } from "@/theme/theme"
import { Icon , type IconName } from '@/components/ui/atoms/icon'; 
import { useState } from "react";

type InputProps = TextInputProps & {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  error?: boolean;
  label?: string;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: string;
  iconColor?: string;
  iconVariant?: 'outline' | 'solid' | 'mini' | 'micro';
  pressableIcon?: boolean,
};

export const Input = ({
  placeholder,
  value,
  onChangeText,
  label,
  containerStyle,
  isPassword,
  error,
  icon,
  iconPosition,
  iconColor,
  iconVariant,
  pressableIcon,
  ...props
}: InputProps) => {

  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value;

  return (
    <View style={[styles.container, (isFilled || isFocused) && styles.active , isFocused && styles.focused ,error && styles.errorStyle]}>
      <TextInput
        {...props}
        style={[styles.textInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword ? true : false}
      />
      {icon && iconPosition === 'right' ? <Icon name={icon} color={iconColor} variant={iconVariant} size={24} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  active: { backgroundColor: theme.colors.white},
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
    paddingVertical: theme.spacing.sm,
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
  }
});

export default Input;