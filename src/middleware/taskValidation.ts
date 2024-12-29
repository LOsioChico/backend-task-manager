import { body, param, query } from "express-validator";

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const getTasksValidation = [
  query("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

export const updateTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];
