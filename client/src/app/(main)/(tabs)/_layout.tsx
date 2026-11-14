import { Tabs } from "expo-router";
import Login from "@/app/(auth)/login";
import {TabBar} from "@/components/ui/organisms/TabBar";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props)=><TabBar {...props}/>} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};
