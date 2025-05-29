import { getCategories } from "@/shared/services/category/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return categories;
};
