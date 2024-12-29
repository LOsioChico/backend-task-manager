import winston from "winston";
import morgan from "morgan";

import { config } from "../config";

const { combine, timestamp, printf, colorize } = winston.format;

const readableFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: config.environment === "development" ? "debug" : "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    config.environment === "development"
      ? combine(colorize(), readableFormat)
      : winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const morganFormat =
  config.environment === "development"
    ? ":method :url :status :response-time ms"
    : "combined";

export const httpLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});
