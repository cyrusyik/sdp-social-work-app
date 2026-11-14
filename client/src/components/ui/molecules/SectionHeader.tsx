import React from 'react';
import { View, StyleSheet , type TextProps} from 'react-native';
import { theme } from '@/theme/theme';
import { AppText } from '@/components/ui/atoms/AppText';

export const SectionHeader = ({children}:TextProps) => {
  return (
    <AppText preset="body1Bold">{children}</AppText>
  );
};

const styles = StyleSheet.create({
});

export default SectionHeader;