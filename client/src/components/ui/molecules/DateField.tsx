import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { theme } from '@/theme/theme';
import {AppCheckbox} from '@/components/ui/atoms/AppCheckBox';
import { AppText , FONTS } from '@/components/ui/atoms/AppText';

type DateFieldProps ={
  currentDate?: string;
  error?: string;
}

export const DateField = ({currentDate, error}:DateFieldProps) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  const customDate = `${year}/${month}/${day}`;

  const [isFocused, setIsFocused] = useState(false);
  const [value, onChangeText] = useState("");
  const [endDateValue, onChangeEndDateValue] = useState("");
  const [dateRange, setDateRange] = useState(false);

  const isFilled = value;

  const toggleDateRange = () => {                                   // new
    if (dateRange) onChangeEndDateValue("");   // clear the end date when the range is turned off
    setDateRange((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <AppText preset="body2">{"日期"}</AppText>
      <View style={styles.inputContainer}>
        <View 
          style={[
            styles.dateInputContainer,
            (isFilled || isFocused) && styles.active,
            isFocused && styles.focused,
            error && styles.errorStyle,
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder={customDate}
            placeholderTextColor={theme.colors.placeholderActive}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            textAlignVertical="top"
            keyboardType='number-pad'
          />
          <View style={styles.dateSeparatorContainer}>
            <AppText
              preset="body1"
              style={
                dateRange
                  ? { color: theme.colors.primaryText }
                  : { color: theme.colors.placeholderInactive }
              }
            >
              至
            </AppText>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={customDate}
            placeholderTextColor={dateRange ? theme.colors.placeholderActive : theme.colors.placeholderInactive}
            editable={dateRange}
            value={endDateValue}
            onChangeText={onChangeEndDateValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            textAlignVertical="top"
            keyboardType='number-pad'
          />
        </View>
        <AppCheckbox
          accessibilityLabel="日期範圍"
          label="日期範圍"
          onPress={toggleDateRange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%',
    gap: theme.spacing.md,
  },
  textInput: {
    flex: 1,
    minWidth: 0,
    fontSize: theme.typography.tabular,
    padding: 0,
    fontVariant: ['tabular-nums'],
    textAlign: 'left',
  },
  dateSeparatorContainer: {
    width: theme.spacing.lg,
    alignItems: 'center',
  },
  active: { backgroundColor: theme.colors.white },
  focused: { borderColor: theme.colors.strokeActive },
  error: { borderColor: theme.colors.alert },
  disabled: { opacity: 0.5 },
  dateInputContainer:{
    minHeight: 48,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.inputFieldInactive,
  },
  errorStyle: {
    borderColor: theme.colors.alert,
    borderWidth: 1,
  },
});

export default DateField;