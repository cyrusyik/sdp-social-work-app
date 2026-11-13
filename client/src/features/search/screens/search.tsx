import { AppText } from "@/components/ui/atoms/app-text";
import { Screen } from "@/components/ui/atoms/screen";

export default function SearchScreen() {
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <AppText preset="h1">Hello</AppText>
    </Screen>
  );
}
