import { Request, Response, NextFunction } from 'express'
import PaginationService from '../services/PaginationService'

export default function paginationMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { take, page } = req.query

  const pagination = PaginationService.createPagination({ take: Number(take), page: Number(page) })
  res.locals.pagination = pagination
  next()
}
