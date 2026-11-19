import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { AppText } from '../atoms/AppText';

type ResultCountProps = {
  count: number;
};

export const ResultCount = ({ count }: ResultCountProps) => {
  return (
    <AppText preset='tagline' style={styles.text}>{`正顯示 ${count} 個結果`}</AppText>
  );
};

const styles = StyleSheet.create({
  text:{
    color: theme.colors.secondaryText,
  }
});

export default ResultCount;