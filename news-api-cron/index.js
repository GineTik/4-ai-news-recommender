import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchNews = async () => {
  const response = await axios.get(process.env.FETCH_NEWS_URL);

  console.log("Send data");
  if (response.status === 200) {
    await axios.post(process.env.URL_FOR_UPLOAD_NEWS, response.data.articles);
  }
  return response.data;
};

await fetchNews();

cron.schedule("*/30 * * * *", async () => {
  console.log("running a task every 30 minutes");
  try {
    await fetchnews();
  } catch (error) {
    console.error(error);
  }
});
