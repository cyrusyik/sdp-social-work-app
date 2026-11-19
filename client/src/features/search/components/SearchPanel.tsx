import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { useState } from 'react';

import {SegmentedControl, type SegmentOption} from '@/components/ui/molecules/SegmentedControl';

export const SearchPanel = () => {
  type SearchTab = "forms" | "clients";

  const TABS: SegmentOption<SearchTab>[] = [
     { label: "表格", value: "forms" },
     { label: "案主", value: "clients" },
   ];

  const [tab, setTab] = useState<SearchTab>("forms");
  return (
    <View>
      <SegmentedControl options={TABS} value={tab} onChange={setTab}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default SearchPanel;

// type SearchTab = "forms" | "clients";

//   const TABS: SegmentOption<SearchTab>[] = [
//     { label: "表格", value: "forms" },
//     { label: "案主", value: "clients" },
//   ];

// const [tab, setTab] = useState<SearchTab>("forms");

//<SegmentedControl options={TABS} value={tab} onChange={setTab} />