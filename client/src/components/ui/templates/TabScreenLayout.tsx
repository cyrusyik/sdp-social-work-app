// components/ui/templates/tab-screen-layout.tsx
import type { ReactNode } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme/theme";

type TabScreenLayoutProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const TabScreenLayout = ({ children, style }: TabScreenLayoutProps) => (
  // top inset only: the tab bar already handles the bottom inset
  <SafeAreaView edges={["top"]} style={[styles.container, style]}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
});

export default TabScreenLayout;