export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    status: number;
    details?: unknown;
  };
}

export class AppError extends Error {
  constructor(
    public status: number,
    public override message: string,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, "NOT_FOUND");
  }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, "Validation error", "VALIDATION_ERROR", details);
  }
}
