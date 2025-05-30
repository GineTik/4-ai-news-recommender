import { News, NewsFilters, Source } from "../types";
import { ITXClientDenyList } from "../../../../generated/prisma/runtime/library";
import { PrismaClient } from "../../../../generated/prisma";
import { prisma } from "@/shared/prisma";

export class NewsRepository {
  async addNews(
    news: Omit<News, "id" | "sourceId">,
    source: Omit<Source, "id">,
    tx: Omit<PrismaClient, ITXClientDenyList>,
    categories?: string[]
  ) {
    await tx.news.create({
      data: {
        title: news.title,
        description: news.description,
        content: news.content,
        originalUrl: news.originalUrl,
        image: news.image,
        publishedAt: news.publishedAt,
        categories:
          categories?.length == undefined
            ? undefined
            : {
                connect: categories.map((category) => ({
                  name: category,
                })),
              },
        source: {
          connectOrCreate: {
            where: {
              name: source.name,
            },
            create: source,
          },
        },
      },
    });
  }

  async getLastNewsDate(tx: Omit<PrismaClient, ITXClientDenyList>) {
    const lastNews = await tx.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      take: 1,
    });
    return lastNews[0]?.publishedAt;
  }

  async getNews(filters: NewsFilters) {
    return await prisma.news.findMany({
      where: {
        categories: {
          some: {
            name: filters.categoryName,
          },
        },
        ...(filters.isBookmarked && {
          id: {
            in: filters.bookmarked,
          },
        }),
        ...(filters.isLiked && {
          id: {
            in: filters.liked,
          },
        }),
        ...(filters.isLiked &&
          filters.isBookmarked && {
            id: {
              in: filters.liked?.filter((id) =>
                filters.bookmarked?.includes(id)
              ),
            },
          }),
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        categories: true,
        source: true,
      },
      take: 10,
      skip: (filters.page ?? 0) * 10,
    });
  }

  async getTotalCount(filters: NewsFilters) {
    return await prisma.news.count({
      where: {
        categories: { some: { name: filters.categoryName } },
        ...(filters.isLiked && {
          id: {
            in: filters.liked,
          },
        }),
        ...(filters.isBookmarked && {
          id: {
            in: filters.bookmarked,
          },
        }),
        ...(filters.isLiked &&
          filters.isBookmarked && {
            id: {
              in: filters.liked?.filter((id) =>
                filters.bookmarked?.includes(id)
              ),
            },
          }),
      },
    });
  }
}

export const newsRepository = new NewsRepository();
