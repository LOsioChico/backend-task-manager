import express, { type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

import { config } from "./config";

const app = express();

app.use(express.json());
app.use(rateLimit(config.rateLimit));
app.use(cors({ origin: config.corsOrigins }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
