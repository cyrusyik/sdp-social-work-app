import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { theme } from "@/theme/theme";

export const FormMetaBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <AppText preset="tagline" style={styles.label}>已選擇</AppText>
        <AppText preset="tagline" style={styles.value}>「實地探訪督導–事前預備工作紙」</AppText>
      </View>

      <View style={styles.item}>
        <AppText preset="tagline" style={styles.label}>案主</AppText>
        <AppText preset="tagline" style={styles.value}>陳大文 CHAN T.M.</AppText>
      </View>
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