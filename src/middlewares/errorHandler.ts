/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

export default function errorHandlerMiddleware (err, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ApiError) {
    const { httpStatus, ...rest } = err
    res.status(httpStatus).json(rest)
  } else {
    res.status(500).json({
      message: 'Unknown',
      code: 'unknown',
      additionalProperties: {
        stack: err.stack,
        code: err.code,
        message: err.message,
      },
    })
  }
}
