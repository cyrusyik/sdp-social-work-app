import { AppText } from "@/components/ui/atoms/AppText";
import { Screen } from "@/components/ui/atoms/Screen";
import { useState } from "react";
import { TextAreaField } from "@/components/ui/molecules/TextAreaField";

export default function SearchScreen() {
  const [reason, setReason] = useState("");
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <AppText preset="h1">Hello</AppText>
      <TextAreaField
        label="你覺得案主申請計劃的目標是甚麼?"
        hint="idk"
        placeholder="e.g., 我想學習如何使用優勢評估來確定對案主有意義或重要的目標；我想學
習如何使用個人充權計劃把目標分拆為小步驟；我想學習如何幫助案主處理追求目標中的猶豫不決"
        value={reason}
        onChangeText={setReason}
      />
    </Screen>
  );
}
