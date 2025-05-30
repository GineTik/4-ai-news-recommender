import { LoadingButton, Skeleton } from "@/shared/ui";
import { isBookmarked } from "@/shared/business-logic/bookmark.service";
import { isLiked, News } from "@/shared/business-logic";
import { NewsCard } from "./news-card";

type NewsListProps = {
  news: News[];
  hasMore?: boolean;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
};

export const NewsList = ({
  news,
  isLoading,
  isFetchingNextPage,
  hasMore,
  fetchNextPage,
}: NewsListProps) => {
  if (isLoading && !isFetchingNextPage) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[250px]" />
        <Skeleton className="w-full h-[250px]" />
        <Skeleton className="w-full h-[250px]" />
      </div>
    );
  }

  const noNewsFound = news.length === 0 && !isFetchingNextPage;
  if (noNewsFound) {
    return <p className="text-center my-10">Новин не знайдено.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {news.map((newsItem, index) => (
        <NewsCard
          key={`${newsItem.id}-${index}`}
          news={newsItem}
          isDefaultLiked={isLiked(newsItem.id)}
          isDefaultBookmarked={isBookmarked(newsItem.id)}
        />
      ))}
      {hasMore && (
        <LoadingButton
          variant="neutral"
          className="w-full"
          isLoading={isFetchingNextPage}
          onClick={() => {
            if (hasMore) {
              fetchNextPage?.();
            }
          }}
        >
          Показати ще
        </LoadingButton>
      )}

      {!hasMore && !isFetchingNextPage && news.length > 0 && (
        <div className="flex justify-center items-center">
          <p className="text-center my-10">Нажаль, більше новин не знайдено.</p>
        </div>
      )}
    </div>
  );
};
