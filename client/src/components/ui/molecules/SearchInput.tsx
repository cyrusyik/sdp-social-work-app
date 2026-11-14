import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import Input from '@/components/ui/atoms/Input';

type SearchInputProps = {
  disabled?: boolean;
  placeholder: string;
  iconSize?: number;
}

export const SearchInput = ({disabled, iconSize, placeholder, ...props}:SearchInputProps) => {
  return (
    <Input placeholder={placeholder} {...props} icon='MagnifyingGlassIcon' iconPosition='right' iconVariant='micro' iconSize={iconSize}/>
  );
};

export default SearchInput;