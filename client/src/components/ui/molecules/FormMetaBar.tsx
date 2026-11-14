import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

export type FormMetaBarItem = {
  label: string;
  value: string;
}

type FormMetaBarProps = {
  items: FormMetaBarItem[];
  style?: StyleProp<ViewStyle>;
}

export const FormMetaBar = ({ items, style}: FormMetaBarProps) => {
  return (
    <View style={styles.container}>
      {items.filter((item) => !!item.value).map((item)=>(
        <View key={item.label} style={styles.item}>
          <AppText preset="tagline" style={styles.label}>{item.label}</AppText>
          <AppText preset="tagline" style={styles.value}>{item.value}</AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.lg },
  item: { gap: 2 },
  label: { fontSize: theme.typography.tagline, color: theme.colors.secondaryText },
  value: { fontSize: theme.typography.tagline, color: theme.colors.secondaryText },
});


// const items = [
//   { label: "已選擇", value: "「實地探訪督導–事前預備工作紙」" },
//   { label: "案主", value: "陳大文 CHAN T.M." },
// ];