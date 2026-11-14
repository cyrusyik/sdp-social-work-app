// components/ui/molecules/screen-header.tsx
import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { IconButton } from "@/components/ui/atoms/IconButton";
import { theme } from "@/theme/theme";

type ScreenHeaderProps = {
  onBack?: () => void;          // back button only renders when this is provided
  backLabel?: string;
  children?: ReactNode;         // optional content under the title, e.g. FormMetaBar
  style?: StyleProp<ViewStyle>;
};

export const ScreenHeader = ({
  onBack,
  backLabel = "返回",
  children,
  style,
}: ScreenHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {onBack ? (
        <IconButton
          icon="ChevronLeftIcon"
          size="lg"
          accessibilityLabel={backLabel}
          iconColor={theme.colors.primaryText}
          iconVariant="mini"
          onPress={onBack}
          style={styles.back}
        />
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  back: {
    marginLeft: -theme.spacing.sm,   // optically align the arrow with the title's left edge
    alignSelf: "flex-start",
    backgroundColor: theme.colors.whiteActive,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  title: {
    flex: 1,                         // lets long titles wrap instead of pushing the action off-screen
    fontSize: theme.typography.h1,
    fontWeight: "700",
    color: theme.colors.primaryText,
  },
  right: { flexShrink: 0 },
});

export default ScreenHeader;

{/* <ScreenHeader
  title="填寫表格"
  onBack={navigation.goBack}
>
  <FormMetaBar status="已結案" clientName="陳大文 CHAN T.M." />
</ScreenHeader> */}