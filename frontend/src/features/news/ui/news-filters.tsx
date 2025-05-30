import { Label } from "@/shared/ui";
import { Switch } from "@/shared/ui";
import { NewsFiltersWithoutPage } from "@/shared/business-logic";
import { Dispatch, SetStateAction } from "react";

export const NewsFilters = ({
  filters,
  setFilters,
}: {
  filters: NewsFiltersWithoutPage;
  setFilters: Dispatch<SetStateAction<NewsFiltersWithoutPage>>;
}) => {
  return (
    <div className="flex gap-3 flex-col">
      <div className="flex items-center space-x-2">
        <Switch
          id="is-personalized"
          checked={filters.isPersonalized}
          onCheckedChange={(checked) => {
            setFilters((old) => ({
              ...old,
              isPersonalized: checked,
            }));
          }}
        />
        <Label htmlFor="is-personalized">
          Персоналізувати за відповідністю (повільніші запити)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="is-liked"
          checked={filters.isLiked}
          onCheckedChange={(checked) => {
            setFilters((old) => ({
              ...old,
              isLiked: checked,
            }));
          }}
        />
        <Label htmlFor="is-liked">Відфільтрувати які сподобалися</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="is-bookmarked"
          checked={filters.isBookmarked}
          onCheckedChange={(checked) => {
            setFilters((old) => ({
              ...old,
              isBookmarked: checked,
            }));
          }}
        />
        <Label htmlFor="is-bookmarked">Відфільтрувати збережені</Label>
      </div>
    </div>
  );
};
