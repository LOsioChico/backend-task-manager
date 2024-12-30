import express from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Get API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *       503:
 *         description: API is unhealthy
 */
router.get("/", (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  const health = {
    status: isDbConnected ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: {
      status: isDbConnected ? "connected" : "disconnected",
    },
  };

  logger.info("Health check performed", { health });

  res.status(isDbConnected ? 200 : 503).json({
    success: true,
    data: health,
  });
});

export default router;
