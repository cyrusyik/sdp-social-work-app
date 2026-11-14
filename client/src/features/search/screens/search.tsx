import { AppText } from "@/components/ui/atoms/AppText";
import { Screen } from "@/components/ui/atoms/Screen";

export default function SearchScreen() {
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <AppText preset="h1">Hello</AppText>
    </Screen>
  );
}
