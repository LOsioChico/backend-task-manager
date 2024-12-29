import express, { type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { config, swaggerOptions } from "./config";
import { httpLogger, logger } from "./utils/logger";
import taskRoutes from "./routes/taskRoutes";

const app = express()
  .use(express.json())
  .use(rateLimit(config.rateLimit))
  .use(cors({ origin: config.corsOrigins }))
  .use(httpLogger);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/tasks", taskRoutes);

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
