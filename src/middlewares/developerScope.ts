import { NextFunction, Request, Response } from 'express'
import { Developer } from '../entity/Developer'
import ApiError from '../errors/ApiError'
import RecordNotFoundError from '../errors/RecordNotFoundError'

export default async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { developerId } = req.params
    const developer = await Developer.findOne(developerId)

    if (!developer) throw new RecordNotFoundError('Developer', { id: developerId })

    res.locals.developer = developer
    next()
  } catch (e) {
    next(new ApiError(e))
  }
}
