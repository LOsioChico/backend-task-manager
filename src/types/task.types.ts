export interface TaskResponse {
  success: boolean;
  data: ITask | ITask[] | null;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}
