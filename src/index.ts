import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { config, swaggerOptions } from "./config";
import { httpLogger, logger } from "./utils/logger";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express()
  .use(express.json())
  .use(cors({ origin: config.corsOrigins }))
  .use(httpLogger);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error", { error });
    process.exit(1);
  });

export default app;
