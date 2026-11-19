// features/search/screens/search-screen.tsx
import {ResultList} from "@/features/search/components/ResultList";
import { TabScreenLayout } from "@/components/ui/templates/TabScreenLayout";
import { SearchPanel } from "@/features/search/components/SearchPanel";
import { ResultHeader } from "@/features/search/components/ResultHeader";
import { useSearch } from "@/features/search/hooks/use-search";
import { MOCK_FORM_OPTIONS } from "@/features/search/utils/mock-data";

export const SearchScreen = () => {
  const s = useSearch();

  const emptyText = s.error
    ? "搜尋失敗,請稍後再試"
    : s.hasSearched
      ? "沒有找到結果"
      : "請輸入條件後按搜尋";

  return (
    <TabScreenLayout>
      <ResultList
        items={s.visible}
        loading={s.loading}
        emptyText={emptyText}
        searchType={tab}
        onItemPress={(item) => console.log("open", item.id)}   // TODO: router.push to the record
        header={
          <>
            <SearchPanel
              tab={s.tab}
              onTabChange={s.changeTab}
              formOptions={MOCK_FORM_OPTIONS}
              formId={s.formId}
              onFormChange={s.setFormId}
              query={s.query}
              onQueryChange={s.setQuery}
              advancedOpen={s.advancedOpen}
              onAdvancedToggle={s.toggleAdvanced}
              onSearch={s.search}
              loading={s.loading}
            >
              {/* TODO: advanced filters (date range, etc.) */}
            </SearchPanel>

            {s.hasSearched ? (
              <ResultHeader
                statuses={s.statuses}
                onStatusesChange={s.setStatuses}
                sort={s.sort}
                onSortChange={s.setSort}
                count={s.visible.length}
              />
            ) : null}
          </>
        }
      />

    </TabScreenLayout>
  );
};

export default SearchScreen;