import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Task } from "../models/Task";
import { ValidationError, NotFoundError } from "../types/error.types";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { completed, page = 1, limit = 10 } = req.query;
    const filter = completed !== undefined ? { completed } : {};

    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new NotFoundError("Task");
    }
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw new NotFoundError("Task");
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      throw new NotFoundError("Task");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
