import type { ComponentProps } from "react";
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { type Tabs } from "expo-router";
import { type IconName } from '@/components/ui/atoms/Icon';
import { TabBarItem } from '@/components/ui/molecules/TabBarItem';

type TabBarRenderer = NonNullable<ComponentProps<typeof Tabs>["tabBar"]>;
type BottomTabBarProps = Parameters<TabBarRenderer>[0];

const TABS: Record<string, {label: string; icon: IconName}> = {
  search: { label: "搜尋", icon: "MagnifyingGlassIcon" },
  create: { label: "紀錄", icon: "PlusCircleIcon" },
  profile: { label: "個人", icon: "UserCircleIcon" },
}

export const TabBar = ({ state, emitter, navigateToTab, insets }: BottomTabBarProps) => {
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route, index) => {
        const tab = TABS[route.name];
        if (!tab) return null;                       // skip routes you didn't define

        const focused = state.index === index;

        const handlePress = () => {
          const event = emitter.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigateToTab(route.key);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            label={tab.label}
            icon={tab.icon}
            focused={focused}
            onPress={handlePress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.stroke,
  },
});

export default TabBar;