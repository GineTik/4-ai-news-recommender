export const isLiked = (newsId: number) => {
  return getLikes().includes(newsId);
};

export const likeNews = (newsId: number) => {
  localStorage.setItem(`likes`, JSON.stringify([...getLikes(), newsId]));
};

export const unlikeNews = (newsId: number) => {
  localStorage.setItem(
    `likes`,
    JSON.stringify(getLikes().filter((id) => id !== newsId))
  );
};

export const getLikes = () => {
  return JSON.parse(localStorage.getItem(`likes`) || "[]") as number[];
};
