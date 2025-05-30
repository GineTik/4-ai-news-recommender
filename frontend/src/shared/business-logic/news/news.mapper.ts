import { Category, News, NewsResponse } from "../types";

export const mapResponseToNewsInput = (newsResponse: NewsResponse) => {
  return {
    title: newsResponse.title,
    image: newsResponse.image,
    description: newsResponse.description,
    content: newsResponse.content,
    originalUrl: newsResponse.url,
    publishedAt: new Date(newsResponse.publishedAt),
  };
};

export const mapToAiInputData = (
  interestedCategories: Category[],
  likedNewsDetails: News[],
  bookmarkedNewsDetails: News[],
  news: News[]
) => {
  return {
    userPreferences: {
      interestedCategories: interestedCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
      likedNews: likedNewsDetails.map((n) => ({
        id: n.id,
        title: n.title,
        description: n.description,
        categories: n.categories?.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })),
      })),
      bookmarkedNews: bookmarkedNewsDetails.map((n) => ({
        id: n.id,
        title: n.title,
        description: n.description,
        categories: n.categories?.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })),
      })),
    },
    newsToScore: news.map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description,
      content: n.content,
      categories: n.categories?.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
      publishedAt: n.publishedAt.toISOString(),
    })),
  };
};
