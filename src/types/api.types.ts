// Generic API response wrapper matching backend shape
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export class ApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
