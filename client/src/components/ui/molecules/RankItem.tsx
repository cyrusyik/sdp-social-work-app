// components/ui/molecules/rank-item.tsx
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/atoms/AppText";
import { DragHandle } from "@/components/ui/atoms/DragHandle";
import { theme } from "@/theme/theme";

type RankItemProps = {
  rank: number;
  label: string;
  isActive?: boolean;          // true while this item is being dragged
  onDragStart?: () => void;    // the list's drag() function
  onMoveUp?: () => void;       // for screen readers, who can't drag
  onMoveDown?: () => void;
};

export const RankItem = ({
  rank,
  label,
  isActive = false,
  onDragStart,
  onMoveUp,
  onMoveDown,
}: RankItemProps) => {
  return (
    <View
      accessible
      accessibilityLabel={`${rank}. ${label}`}
      accessibilityActions={[
        { name: "moveUp", label: "上移" },
        { name: "moveDown", label: "下移" },
      ]}
      onAccessibilityAction={(e) => {
        if (e.nativeEvent.actionName === "moveUp") onMoveUp?.();
        if (e.nativeEvent.actionName === "moveDown") onMoveDown?.();
      }}
      style={styles.row}
    >
      <AppText preset="body1" style={styles.rank}>{rank}.</AppText>

      <View style={[styles.card, isActive && styles.cardActive]}>
        <AppText preset="body1" numberOfLines={1} style={styles.label}>
          {label}
        </AppText>
        <DragHandle onPressIn={onDragStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,       // the gap between cards lives here
  },
  rank: {
    fontSize: theme.typography.body1,
    color: theme.colors.primaryText,
    fontVariant: ['tabular-nums'],
  },
  card: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.white,
  },
  cardActive: {
    borderColor: theme.colors.strokeActive,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,                             // Android shadow
  },
  label: { flex: 1, fontSize: theme.typography.body1, color: theme.colors.primaryText },
});

export default RankItem;