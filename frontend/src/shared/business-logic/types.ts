export type NewsResponse = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

import type {
  Category as PrismaCategory,
  News as PrismaNews,
  Source as PrismaSource,
} from "@/../generated/prisma";

export type News = PrismaNews & {
  categories?: PrismaCategory[];
  source?: PrismaSource | null;
  complianceScore?: number | undefined;
};

export type Category = PrismaCategory;

export type Source = PrismaSource;

export type NewsFilters = {
  liked?: number[];
  bookmarked?: number[];
  categoryName?: string;
  page?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isPersonalized?: boolean;
};

export type NewsFiltersWithoutPage = Omit<NewsFilters, "page">;

export type NewsPage = {
  totalCount: number;
  news: News[];
  hasMore: boolean;
};
