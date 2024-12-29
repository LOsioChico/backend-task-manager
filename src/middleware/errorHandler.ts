import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { AppError, type ErrorResponse } from "../types/error.types";
import { logger } from "../utils/logger";
import mongoose from "mongoose";
import { config } from "../config";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): any => {
  logger.error("Error processing request", {
    err,
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
      params: req.params,
    },
  });

  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        status: err.status,
        ...(config.environment === "development" && { details: err.details }),
      },
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    logger.warn({
      type: "ValidationError",
      details: err.errors,
    });
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        status: 400,
        details: Object.values(err.errors).map((error) => ({
          field: error.path,
          message: error.message,
        })),
      },
    });
  }

  logger.error({
    type: "UnhandledError",
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });

  return res.status(500).json({
    success: false,
    error: {
      message:
        config.environment === "production"
          ? "Internal server error"
          : err.message,
      code: "INTERNAL_ERROR",
      status: 500,
    },
  });
};
