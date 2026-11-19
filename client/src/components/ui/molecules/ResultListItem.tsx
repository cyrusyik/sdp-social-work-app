import React from "react";
import { View, StyleSheet, Pressable , type PressableProps} from "react-native";
import { theme } from "@/theme/theme";
import { AppText } from "../atoms/AppText";

export type ResultProps = {
  id: string;
  clientName: string;
  formTitle: string;
  updatedAt: string;
  createdAt: string;
  status: string;
};

type ResultListItemProps = Omit<PressableProps, "style" | "children"> &{
  item: ResultProps;
  searchType: "form" | "client";
};

export const ResultListItem = ({
  item,
  searchType,
  ...props
}: ResultListItemProps) => {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={`${item.clientName} ${item.formTitle}`}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {searchType == "form" ? (
        <AppText preset="body1">{item.clientName}</AppText>
      ) : (
        <AppText preset="body1">{item.formTitle}</AppText>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.date}>
          <AppText
            preset="tagline"
            style={{ color: theme.colors.buttonInactive }}
          >
            最後修改日期：{item.updatedAt}
          </AppText>
          <AppText
            preset="tagline"
            style={{ color: theme.colors.buttonInactive }}
          >
            •
          </AppText>
          <AppText
            preset="tagline"
            style={{ color: theme.colors.buttonInactive }}
          >
            最後修改日期：{item.createdAt}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },pressed: { opacity: 0.6 },

});

export default ResultListItem;

//const result = {title:"陳大文 CHAN T.M.", value: "最後修改日期：2026-10-23 • 建立日期：2026-10-23"}
