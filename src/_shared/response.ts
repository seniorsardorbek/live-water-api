import { Request } from 'express'

export interface PaginationResponse<T> {
  limit: number
  offset: number
  total: number
  data: T[]
}
export interface CustomRequest extends Request {
  user: any
}
