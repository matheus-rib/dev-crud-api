import { Pagination } from './types'

export type PaginatedResponse = {
  page: number
  pages: number
  count: number
  rows: Array<any>
}

export type PaginatedParams = {
  pagination: Pagination
  count: number
  rows: Array<any>
}

export default ({ pagination, count, rows }: PaginatedParams): PaginatedResponse => {
  return {
    page: pagination.skip / pagination.take + 1,
    pages: Math.ceil(count / pagination.take),
    count,
    rows,
  }
}
