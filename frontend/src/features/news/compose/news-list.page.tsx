"use client";

import { ALL_CATEGORY } from "@/shared/constants/categories";
import { useNews } from "../use-news";
import { useState } from "react";
import { useParams } from "next/navigation";
import { NewsListLayout } from "../ui/news-list.layout";
import { NewsFilters } from "../ui/news-filters";
import { CategoryList } from "../ui/category-list";
import { NewsList } from "../ui/news-list";
import { NewsFiltersWithoutPage } from "@/shared/services";

export const NewsListPage = () => {
  const [filters, setFilters] = useState<NewsFiltersWithoutPage>({});
  const params = useParams<{ category: string }>();
  const news = useNews({
    ...filters,
    categoryName:
      params.category === ALL_CATEGORY ? undefined : params.category,
  });

  return (
    <NewsListLayout
      filtersSlot={
        <>
          <div className="flex flex-col gap-4">
            <CategoryList />
          </div>
          <div>
            <NewsFilters filters={filters} setFilters={setFilters} />
          </div>
        </>
      }
      listSlot={
        <NewsList
          news={news.data?.pages.flatMap((page) => page.news) || []}
          hasMore={news.hasNextPage}
          isLoading={news.isLoading}
          isFetchingNextPage={news.isFetchingNextPage}
          fetchNextPage={news.fetchNextPage}
        />
      }
    />
  );
};
