// components/ui/organisms/result-list.tsx
import { FlatList, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import type { ReactNode } from "react";
import { AppText } from "@/components/ui/atoms/AppText";
import { Spinner } from "@/components/ui/atoms/Spinner";
import { ResultListItem, type ResultProps } from "@/components/ui/molecules/ResultListItem";
import { theme } from "@/theme/theme";

type ResultListProps = {
  items: ResultProps[];
  header?: ReactNode;              // search panel, chips, sort, count
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;       // for pagination later
  onItemPress?: (item: ResultProps) => void;
  emptyText?: string;
  contentStyle?: StyleProp<ViewStyle>;
  searchType: 'form' | 'client';
};

export const ResultList = ({
  items,
  header,
  loading = false,
  refreshing = false,
  onRefresh,
  onEndReached,
  onItemPress,
  contentStyle,
  searchType,
}: ResultListProps) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ResultListItem item={item} onPress={() => onItemPress?.(item)} searchType={searchType}/>
      )}
      ListHeaderComponent={<>{header}</>}
      ListEmptyComponent={
        loading ? (
          <View style={styles.center}>
            <Spinner size="lg" />
          </View>
        ) : (
          undefined
        )
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyboardShouldPersistTaps="handled"     // taps on results work while the keyboard is open
      contentContainerStyle={[styles.content, contentStyle]}
    />
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: theme.spacing.md, paddingBottom: theme.spacing.lg },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.stroke },
  center: { paddingVertical: theme.spacing.lg, alignItems: "center" },
});

export default ResultList;