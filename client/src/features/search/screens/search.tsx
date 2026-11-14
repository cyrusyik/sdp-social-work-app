import { AppText } from "@/components/ui/atoms/app-text";
import { Screen } from "@/components/ui/atoms/screen";
import { useState } from "react";

export default function SearchScreen() {
  const [status, setStatus] = useState<"closed" | "ongoing" | null>(null);
  const [answer, setAnswer] = useState("no");
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <AppText preset="h1">Hello</AppText>
    </Screen>
  );
}
