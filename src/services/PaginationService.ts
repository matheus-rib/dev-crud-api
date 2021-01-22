import { Pagination } from '../utils/types'

type PaginationParamsType = {
  take: number
  page: number
}

export default {
  createPagination (params: PaginationParamsType): Pagination {
    const take = Math.min(500, params.take || 30)
    const page = params.page || 1
    const skip = (page - 1) * take
    return { skip, take }
  },
}
