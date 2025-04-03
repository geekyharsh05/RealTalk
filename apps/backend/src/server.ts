import express, { type Express } from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import Routes from "./routes/index";

export const createServer = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(cookieparser());
  app.use(morgan("dev"));

  app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = [
          "http://localhost:5173",
          "https://yourdomain.com",
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something broke!" });
    }
  );

  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  app.use("/api/v1/", Routes);
    
  return app;
};
