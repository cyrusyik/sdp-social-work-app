import { View, StyleSheet } from "react-native";
import Input from "@/components/ui/atoms/Input";
import { AppText } from "@/components/ui/atoms/AppText";
import { useState } from "react";
import { Button } from "@/components/ui/atoms/Button";
import { Screen } from "@/components/ui/atoms/Screen";
import { FormField } from "@/components/ui/molecules/FormField";
import { PasswordInput } from "@/components/ui/molecules/PasswordInput";

export default function LoginScreen() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "center" }}>
      <View>
        <View style={styles.inputFormContainer}>
          <AppText preset="h1">登入</AppText>
          <FormField
            id="staffID"
            placeholder="職員編號"
            label="職員編號"
            errorMessage="請輸入有效職員編號"
            value={staffId}
            onChangeText={setStaffId}
            error={false}
          />
          <PasswordInput
            id="password"
            error={false}
            errorMessage="錯誤密碼"
            value={password}
            onChangeText={setPassword}
          />
          <View>
            <Button label="忘記密碼" variant="inline"></Button>
          </View>
          <Button
            label="登入"
            variant="primary"
            icon="ArrowLeftEndOnRectangleIcon"
            iconPosition="left"
            iconVariant="micro"
          />
        </View>
      </View>
    </Screen>
  );
}

export const styles = StyleSheet.create({
  inputFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    alignSelf: "stretch",
  },
});
