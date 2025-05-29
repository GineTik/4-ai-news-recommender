import { getNews, getPersonalizedNews } from "@/shared/services";
import { getInterests } from "@/shared/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBookmarks, getLikes } from "@/shared/services";
import { toast } from "sonner";
import { NewsFilters } from "@/shared/services/types";
export const NEWS_QUERY_KEY = "news";

export const useNews = (filters: Omit<NewsFilters, "page">) => {
  return useInfiniteQuery({
    queryKey: [
      NEWS_QUERY_KEY,
      filters.isLiked,
      filters.isBookmarked,
      filters.isPersonalized,
    ],
    gcTime: 1000 * 60,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const pageFilters: NewsFilters = {
        ...filters,
        page: pageParam,
        liked: getLikes(),
        bookmarked: getBookmarks(),
      };

      if (filters.isPersonalized) {
        const interests = getInterests();

        return await getPersonalizedNews(interests, pageFilters).catch(
          (error) => {
            toast.error("Безкоштовні запити вичерпані (100 запитів на день)");
            throw error;
          }
        );
      }

      return await getNews(pageFilters).catch((error) => {
        toast.error("Помилка при завантаженні новин");
        throw error;
      });
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage && lastPage.hasMore) {
        return lastPageParam + 1;
      }
      return undefined;
    },
  });
};
