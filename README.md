# Task Manager API

Backend service for a Task Management application built with Express.js, TypeScript, and MongoDB. This project is part of a full-stack technical assessment.

## Live Demo

https://backend-task-manager-p3o5.onrender.com/

## Project Overview

This API provides a task management system that allows users to:

- Create, read, update and delete tasks
- Filter tasks by completion status
- View task details including title, description, status, and creation date
- Manage task states (completed/pending)
- Monitor API health status

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Documentation**: Swagger/OpenAPI
- **Validation**: Express Validator
- **Logging**: Winston
- **API Security**: CORS

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

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
   NODE_ENV=development
   CORS_ORIGINS=http://localhost:3000
   ```

4. **Run the application**

   ```bash
   # Development
   yarn dev

   # Production build
   yarn build
   yarn start
   ```

## API Endpoints

### Health Check

- `GET /api/health`
  - Check API and database health status
  - Returns uptime and environment information

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

The API documentation is available at `/api-docs` when running locally or at:
https://backend-task-manager-p3o5.onrender.com/api-docs

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
- **Health Monitoring**: Endpoint to check API and database status
- **API Security**:
  - CORS protection
  - Input sanitization
- **Documentation**: Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript implementation

## Error Handling

The API uses a custom error handler to standardize error responses:

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

| Variable     | Description               | Required | Default                    |
| ------------ | ------------------------- | -------- | -------------------------- |
| PORT         | API server port           | No       | 3001                       |
| MONGODB_URI  | MongoDB connection string | Yes      | mongodb://localhost:27017/ |
| NODE_ENV     | Environment               | No       | development                |
| CORS_ORIGINS | Allowed CORS origins      | No       | http://localhost:3000      |
