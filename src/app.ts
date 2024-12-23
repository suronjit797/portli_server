import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import globalError from "./app/middleware/globalError";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));

// route
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response, next) => {
  return res.send("<h1> Welcome to Server </h1>");
});

// global error route
app.use(globalError);

// 404 not found
app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Route not found",
      },
    ],
  });
});

export default app;
