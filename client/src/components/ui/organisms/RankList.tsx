// components/ui/organisms/rank-list.tsx
import { StyleSheet, View } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  type RenderItemParams,
} from "react-native-draggable-flatlist";
import { AppText } from "@/components/ui/atoms/AppText";
import { RankItem } from "@/components/ui/molecules/RankItem";
import { theme } from "@/theme/theme";

export type RankListItem = { id: string; label: string };

type RankListProps = {
  title?: string;
  items: RankListItem[];
  onChange: (items: RankListItem[]) => void;
};

const move = <T,>(list: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

export const RankList = ({ title, items, onChange }: RankListProps) => {
  return (
    <View style={styles.wrapper}>
      {title ? <AppText preset="body2" style={styles.title}>{title}</AppText> : null}

      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => onChange(data)}
        scrollEnabled={false}               // the screen's ScrollView does the scrolling
        renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<RankListItem>) => {
          const index = getIndex() ?? 0;
          return (
            <ScaleDecorator>
              <RankItem
                rank={index + 1}
                label={item.label}
                isActive={isActive}
                onDragStart={drag}
                onMoveUp={() => onChange(move(items, index, index - 1))}
                onMoveDown={() => onChange(move(items, index, index + 1))}
              />
            </ScaleDecorator>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", gap: theme.spacing.sm },
  title: { fontSize: theme.typography.body2 },
});

export default RankList;