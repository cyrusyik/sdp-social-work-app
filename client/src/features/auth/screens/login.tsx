import { View, StyleSheet } from "react-native";
import Input from "../../../components/ui/input";
import CustomText from "../../../components/ui/app-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";

export default function LoginScreen() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen scroll={false} contentStyle={{ justifyContent: 'center' }}>
      <View>
        <View style={styles.inputFormContainer}>
          <CustomText preset="h1">登入</CustomText>
          <Input
            id="staffID"
            placeholder="職員編號"
            label="職員編號"
            errorMessage="請輸入有效職員編號"
            value={staffId}
            onChangeText={setStaffId}
            isPassword={false}
            errorExist={false}
          />
          <Input
            id="password"
            placeholder="帳戶密碼"
            label="帳戶密碼"
            isPassword={true}
            errorExist={false}
            errorMessage="錯誤密碼"
            value={password}
            onChangeText={setPassword}
          />
          <View>
            <Button label="忘記密碼" variant="inline"></Button>
          </View>
          <Button label="登入" variant="primary" icon="ArrowLeftEndOnRectangleIcon" iconPosition="left" buttonVariant="micro" />
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
