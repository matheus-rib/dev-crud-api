import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

export default function notFoundMiddleware (req: Request, res: Response, next: NextFunction): void {
  next(new ApiError({
    code: 'routeNotFound',
    message: 'Route not found',
    httpStatus: 404,
  }))
}
