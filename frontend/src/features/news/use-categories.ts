import { getCategories } from "@/shared/business-logic/category/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return categories;
};
