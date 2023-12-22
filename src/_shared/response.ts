export interface PaginationResponse<T> {
    limit: number;
    offset: number;
    total: number;
    data: T[];
  }
  