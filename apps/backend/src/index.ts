import { log } from "@repo/logger";
import { createServer } from "./server";
import { Database } from "./lib/db";
import "dotenv/config"

const port = process.env.PORT || 5001;
const server = createServer();

const startServer = async () => {
  try {
    const db = Database.getInstance();
    await db.connect();

    server.listen(port, () => {
      log(`api running on ${port}`);
    });
    

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
