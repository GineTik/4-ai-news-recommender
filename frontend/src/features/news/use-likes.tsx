import { likeNews, unlikeNews } from "@/shared/services";
import { useQueryClient } from "@tanstack/react-query";
import { NEWS_QUERY_KEY } from "./use-news";
export const useLikeNews = (newsId: number) => {
  const queryClient = useQueryClient();

  return {
    like: () => {
      likeNews(newsId);
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEY] });
    },
    unlike: () => {
      unlikeNews(newsId);
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEY] });
    },
  };
};
