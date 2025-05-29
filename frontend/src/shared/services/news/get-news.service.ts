"use server";

import { prisma } from "@/shared/prisma";
import { News, NewsFilters, NewsPage } from "../types";
import { newsAi } from "./news.ai";
import { newsRepository } from "./news.repository";

export const getNews = async (filters: NewsFilters) => {
  await prisma.$connect();

  const news = await newsRepository.getNews(filters);
  const totalCount = await newsRepository.getTotalCount(filters);

  await prisma.$disconnect();
  return getPage(news, totalCount, filters.page ?? 0);
};

export const getPersonalizedNews = async (
  interests: number[],
  filters: NewsFilters
) => {
  await prisma.$connect();

  const interestedCategories = await prisma.category.findMany({
    where: {
      id: {
        in: interests,
      },
    },
  });

  const lastMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

  const likedNewsDetails = await prisma.news.findMany({
    where: {
      id: {
        in: filters.liked,
      },
      publishedAt: {
        gte: lastMonth,
      },
    },
    include: {
      categories: true,
    },
  });

  const bookmarkedNewsDetails = await prisma.news.findMany({
    where: {
      id: {
        in: filters.bookmarked,
      },
      publishedAt: {
        gte: lastMonth,
      },
    },
    include: {
      categories: true,
    },
  });

  const page = await getNews(filters);

  if (page.news.length === 0) {
    await prisma.$disconnect();
    return {
      totalCount: 0,
      news: [],
      hasMore: false,
    };
  }

  const scoredItems = await newsAi.getComplianceScoreByAi(
    interestedCategories,
    likedNewsDetails,
    bookmarkedNewsDetails,
    page.news
  );

  const newsWithScores = page.news.map((newsItem) => {
    const score = scoredItems.find((item) => item.newsId === newsItem.id);
    return {
      ...newsItem,
      complianceScore: score ? score.complianceScore : 0,
    };
  });

  await prisma.$disconnect();
  return {
    ...page,
    news: newsWithScores,
  };
};

const getPage = (news: News[], totalCount: number, page: number): NewsPage => {
  return {
    totalCount,
    news,
    hasMore: (page + 1) * 10 < totalCount,
  };
};
