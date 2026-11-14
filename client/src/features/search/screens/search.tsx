import { AppText } from "@/components/ui/atoms/app-text";
import { Screen } from "@/components/ui/atoms/screen";
import { Chip } from "@/components/ui/atoms/chip";
import { useState } from "react";
import { ChipGroup } from "@/components/ui/molecules/chipGroup";
import { Divider } from "@/components/ui/atoms/divider";

export default function SearchScreen() {
  const [status, setStatus] = useState<"closed" | "ongoing" | null>(null);
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <AppText preset="h1">Hello</AppText>
    </Screen>
  );
}
