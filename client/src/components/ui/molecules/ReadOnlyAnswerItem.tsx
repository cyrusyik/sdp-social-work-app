import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { AppText } from '@/components/ui/atoms/AppText';
import AppCheckbox from '@/components/ui/atoms/AppCheckBox';
import {RatingScale, type RatingScaleOption} from './RatingScale';

export type checkboxAnswerProps ={
  label: string;
  checked: boolean;
}

export type TextAnswerProps={
  label: string;
  value: string;
}

export type ratingScaleAnswerProps={
  value: number;
  selected: boolean;
}

type ReadOnlyAnswerItemProps<T extends number> ={
  answerType: "text" | "checkbox" | "ratingScale";
  textAnswer?: TextAnswerProps;
  checkboxAnswer?: checkboxAnswerProps;
  ratingScaleAnswer?: RatingScaleOption<T>[];
}

export function ReadOnlyAnswerItem<T extends number>({
  answerType,
  textAnswer,
  checkboxAnswer,
  ratingScaleAnswer = [],
}: ReadOnlyAnswerItemProps<T>) {
  return (
    <View>
      {answerType === "text" && (
        <View style={styles.container}>
          <AppText preset='tagline' style={{paddingBottom: theme.spacing.sm}}>{textAnswer?.label}</AppText>
          <AppText preset='body1'>{textAnswer?.value}</AppText>
        </View>
      )}
      {answerType === "checkbox" && (
        <AppCheckbox label={checkboxAnswer?.label} checked={checkboxAnswer?.checked}/>
      )}
      {answerType == "ratingScale" && (
        <RatingScale
          label="我目前的居住狀況"
          options={ratingScaleAnswer}
          disabled
          defaultValue={ratingScaleAnswer.find(option => option.selected)?.value}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
  },
});

export default ReadOnlyAnswerItem;