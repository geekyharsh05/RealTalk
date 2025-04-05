import { CronJob } from "cron";
import https from "https";

const API_URL = process.env.API_URL!;

const job = new CronJob("*/14 * * * *", () => {
  if (!API_URL) {
    console.error("API_URL is not defined.");
    return;
  }

  https
    .get(API_URL, (res) => {
      const { statusCode } = res;

      if (statusCode === 200) {
        console.log("GET request sent successfully!");
      } else {
        console.warn(`GET request failed with status code: ${statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error while sending request:", err.message);
    });
});

export default job;