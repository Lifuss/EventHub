import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import eventRouter from "./routes/events";

const format = process.env.NODE_ENV === "production" ? "combined" : "dev";

app.use(cors());

app.use(express.json());

app.use(morgan(format));

app.use("/api/events", eventRouter);

app.use((req: Request, res: Response) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.status(404).json({ message: error.message });
});

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.log(err.message);
  res.status(500).json({ message: "Server error" });
});

export default app;
