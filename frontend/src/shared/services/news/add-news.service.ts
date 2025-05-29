"use server";

import { prisma } from "@/shared/prisma";
import { NewsResponse } from "../types";
import { Category } from "@/shared/services";
import { PrismaClient } from "../../../../generated/prisma";
import { ITXClientDenyList } from "../../../../generated/prisma/runtime/library";
import { categoryRepository } from "../category/category.repository";
import { newsAi } from "./news.ai";
import { newsRepository } from "./news.repository";

export const addNews = async (newsItems: NewsResponse[]) => {
  await prisma.$connect();

  const availableCategories = await categoryRepository.getCategories();
  const categories = await newsAi.getSuitableCategoriesByAi(
    availableCategories,
    newsItems
  );

  try {
    await prisma.$transaction(async (tx) => {
      for (const newsItem of await filterByLastNewsDate(newsItems, tx)) {
        const newsCategories = getNewsCategories(
          newsItem,
          categories,
          availableCategories
        );
        await newsRepository.addNews(
          {
            title: newsItem.title,
            image: newsItem.image,
            description: newsItem.description,
            content: newsItem.content,
            originalUrl: newsItem.url,
            publishedAt: new Date(newsItem.publishedAt),
          },
          {
            name: newsItem.source.name,
            homepageUrl: newsItem.source.url,
          },
          tx,
          newsCategories
        );
      }
    });
  } catch (error) {
    console.error("Error adding news:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const getNewsCategories = (
  newsItem: NewsResponse,
  categories: {
    news: string;
    categories: string[];
  }[],
  availableCategories: Category[]
) => {
  return categories
    .find((category) => category.news === newsItem.title)
    ?.categories.filter((category) =>
      availableCategories.map((c) => c.name).includes(category)
    );
};

const filterByLastNewsDate = async (
  newsItems: NewsResponse[],
  tx: Omit<PrismaClient, ITXClientDenyList>
) => {
  const lastNewsDate = await newsRepository.getLastNewsDate(tx);
  return newsItems.filter(
    (item) => new Date(item.publishedAt) > (lastNewsDate ?? new Date(0))
  );
};
