import { CategoryItem } from "./category-item";
import { useCategories } from "../use-categories";
import { ALL_CATEGORY } from "@/shared/constants/categories";

export const CategoryList = () => {
  const categories = useCategories();

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryItem label="Всі" name={ALL_CATEGORY} />
      {categories.data?.map((category) => (
        <CategoryItem
          key={category.name}
          label={category.label ?? category.name}
          name={category.name}
        />
      ))}
    </div>
  );
};
