import express, { type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import { config } from "./config";

const app = express();

app.use(express.json());
app.use(rateLimit(config.rateLimit));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
