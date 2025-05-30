const BOOKMARKS_KEY = `bookmarks`;

export const isBookmarked = (newsId: number) => {
  return getBookmarks().includes(newsId);
};

export const addBookmark = (newsId: number) => {
  localStorage.setItem(
    BOOKMARKS_KEY,
    JSON.stringify([...getBookmarks(), newsId])
  );
};

export const removeBookmark = (newsId: number) => {
  localStorage.setItem(
    BOOKMARKS_KEY,
    JSON.stringify(getBookmarks().filter((id) => id !== newsId))
  );
};

export const getBookmarks = () => {
  return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]") as number[];
};
