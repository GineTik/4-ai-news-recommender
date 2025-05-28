import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

cron.schedule("*/1 * * * *", async () => {
  console.log("running a task every 30 minutes");
  try {
    const response = await axios.get(process.env.FETCH_NEWS_URL);

    console.log("Send data");
    if (response.status === 200) {
      await axios.post(process.env.URL_FOR_UPLOAD_NEWS, response.data.articles);
    }
  } catch (error) {
    console.error(error);
  }
});
