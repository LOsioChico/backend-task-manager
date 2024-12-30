# Task Manager API

Backend service for a Task Management application built with Express.js, TypeScript, and MongoDB. This project is part of a full-stack technical assessment.

## Project Overview

This API provides a task management system that allows users to:

- Create, read, update and delete tasks
- Filter tasks by completion status
- View task details including title, description, status, and creation date
- Manage task states (completed/pending)

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Documentation**: Swagger/OpenAPI
- **Validation**: Express Validator
- **Logging**: Winston
- **API Security**: Rate Limiting, CORS

## Prerequisites

- Node.js (v20 or higher)
- MongoDB
- yarn (recommended) or npm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend-task-manager
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**

   This project uses environment variables to configure the application. You need to create a `.env` file in the root of the project.

   ```bash
   cp .env.example .env
   ```

4. **Run the application**

   ```bash
   yarn dev
   ```

## API Endpoints

### Tasks

- `POST /api/tasks`

  - Create a new task
  - Required fields: title
  - Optional fields: description

- `GET /api/tasks`

  - List all tasks
  - Supports filtering by completion status
  - Includes pagination

- `GET /api/tasks/:id`

  - Get task details by ID

- `PUT /api/tasks/:id`

  - Update task fields
  - Supports partial updates

- `DELETE /api/tasks/:id`
  - Remove a task

## Data Model

### Task

```typescript
  {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
  }
```

## API Documentation

The API documentation is available at http://localhost:3001/api-docs.

## Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn format` - Format code with Prettier

## Project Structure

```bash
  src/
  ├── config/       # App configuration
  ├── controllers/  # Route controllers
  ├── middleware/   # Express middleware
  ├── models/       # Mongoose models
  ├── routes/       # API routes
  ├── types/        # TypeScript types
  ├── utils/        # Utilities and helpers
  └── index.ts      # App entry point
```

## Features

- **Input Validation**: All endpoints include proper validation
- **Error Handling**: Structured error responses with appropriate HTTP codes
- **Logging**: Request logging and error tracking
- **API Security**:
  - Rate limiting
  - CORS protection
  - Input sanitization
- **Documentation**: Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript implementation

## Error Handling

The API uses a custom error handler to standardize error responses.

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "status": 400,
    "details": {} // Additional error details (development only)
  }
}
```

## Environment Variables

| Variable     | Description               | Required |
| ------------ | ------------------------- | -------- |
| PORT         | API server port           | No       |
| MONGODB_URI  | MongoDB connection string | Yes      |
| NODE_ENV     | Environment               | No       |
| CORS_ORIGINS | Allowed CORS origins      | No       |
