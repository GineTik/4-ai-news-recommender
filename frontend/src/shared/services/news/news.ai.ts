import { writeToAIModel } from "@/shared/ai";
import { Category, News, NewsResponse } from "../types";
import { mapToAiInputData } from "./news.mapper";

export class NewsAi {
  async getSuitableCategoriesByAi(
    availableCategories: Category[],
    news: NewsResponse[]
  ) {
    const availableCategoriesNames = availableCategories
      .map((category) => category.name)
      .join(", ");
    const stringifiedNews = JSON.stringify(
      news.map((item) => ({
        title: item.title,
        description: item.description,
        content: item.content,
      }))
    );

    const response = await writeToAIModel(
      `You are an analyzer. Your task is to analyze news items and assign categories to each.
        IMPORTANT RULE: You MUST select categories EXCLUSIVELY from the following list: ${availableCategoriesNames}. Do NOT use any categories not present in this list.
        Each news item can have a maximum of 3 categories.
        Return the output as a JSON array of objects, where each object has the format: {news: 'title of the news', categories: ['category1', 'category2', 'category3']}`,
      "Here is the news items: " + stringifiedNews
    );

    return JSON.parse(response.choices[0].message.content ?? "") as {
      news: string;
      categories: string[];
    }[];
  }

  async getComplianceScoreByAi(
    interestedCategories: Category[],
    likedNewsDetails: News[],
    bookmarkedNewsDetails: News[],
    news: News[]
  ) {
    const aiInputData = mapToAiInputData(
      interestedCategories,
      likedNewsDetails,
      bookmarkedNewsDetails,
      news
    );

    const userMessage =
      "Here is the data for personalization:\n" + JSON.stringify(aiInputData);

    const aiResponse = await writeToAIModel(SYSTEM_PROMPT, userMessage);
    let scoredItems: { newsId: number; complianceScore: number }[] = [];
    try {
      const content = aiResponse.choices[0].message.content;
      if (content) {
        // Attempt to extract JSON if it's embedded, e.g., in a code block
        const jsonMatch = content.match(
          /```json\\n([\s\S]*?)\\n```|(\[\{[\s\S]*?\}\])/
        );
        if (jsonMatch) {
          // Prioritize the direct array/object match, then the code block match
          scoredItems = JSON.parse(jsonMatch[2] || jsonMatch[1]);
        } else {
          // Fallback to direct parsing if no explicit markers found
          scoredItems = JSON.parse(content);
        }
      }
    } catch (error) {
      console.error("Error parsing AI response for news scores:", error);
      console.error(
        "Problematic AI response content:",
        aiResponse.choices[0].message.content
      );
      // Default to empty array if parsing fails, so the application doesn't crash
    }
    return scoredItems;
  }
}

export const newsAi = new NewsAi();

const SYSTEM_PROMPT = `You are a news personalization engine. Your task is to calculate a compliance score (from 0 to 100) for each news item based on user preferences and recent interactions.

RULES:
1.  **Base Score**: Start each news item with a base score of 0.
2.  **Interested Categories**:
    *   For each news item to be scored, if its categories (use 'name' field of category objects) overlap with the user's 'interestedCategories' (use 'name' field of category objects), add 30 points. This bonus is applied once per news item, even if it matches multiple interested categories.
3.  **Liked News Similarity**:
    *   Compare each news item to be scored (using its title, description, and category names) with each item in the 'likedNews' list (using their title, description, and category names).
    *   If a news item is highly similar (e.g., shares one or more category names AND has significant textual overlap in title/description) to any liked news, add 40 points.
    *   If moderately similar (e.g., shares one or more category names OR has some textual overlap in title/description, but not both high similarity criteria), add 20 points.
    *   This bonus is applied once per news item, based on the strongest similarity to any single liked news item. Do not sum points for similarity to multiple liked items.
4.  **Bookmarked News Similarity**:
    *   Compare each news item to be scored with each item in the 'bookmarkedNews' list, similar to the 'likedNews' comparison.
    *   If a news item is highly similar to any bookmarked news, add 30 points.
    *   If moderately similar, add 15 points.
    *   This bonus is applied once per news item, based on the strongest similarity to any single bookmarked news item.
5.  **Score Capping**: The final compliance score for each news item must be between 0 and 100. If the calculated sum of points from rules 2, 3, and 4 exceeds 100, cap it at 100. Ensure the score is not negative.

Output Format:
Return the output as a valid JSON array of objects. Each object MUST have the following format:
{ "newsId": <id_of_the_news_item>, "complianceScore": <score_between_0_and_100> }
The 'newsId' MUST correspond to the 'id' field of the news items provided in the 'newsToScore' list. Process all items in 'newsToScore'.
IMPORTANT: ONLY return the JSON array. Do NOT include any other text, explanations, or conversational filler before or after the JSON data.
`;
