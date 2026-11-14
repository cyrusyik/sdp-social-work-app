import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { AppText } from '../atoms/AppText';

export type ResultProps={
  title: string;
  value: string;
}

type ResultListItemProps ={
  result: ResultProps;
}

export const ResultListItem = ({result, ...props}:ResultListItemProps) => {
  
  return (
    <View style={styles.container}>
      <AppText preset='body1'>{result.title}</AppText>
      <View style={styles.bottomContainer}>
        <AppText preset='tagline' style={{color: theme.colors.buttonInactive}}>{result.value}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    justifyContent: 'center',
  },bottomContainer:{
    flexDirection: 'row',
  }
});

export default ResultListItem;

//const result = {title:"陳大文 CHAN T.M.", value: "最後修改日期：2026-10-23 • 建立日期：2026-10-23"}