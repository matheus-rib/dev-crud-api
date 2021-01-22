import { Request, Response } from 'express'
import { sanitize } from 'paliari-js-utils'
import { DeepPartial, Like } from 'typeorm'
import { Developer } from '../entity/Developer'
import ApiError from '../errors/ApiError'
import RequiredError from '../errors/RequiredError'
import responsePaginationHandler from '../utils/responsePaginationHandler'
import { LocalsPagination } from '../utils/types'

type ListQuery = {
  name?: string,
  hobby?: string,
  gender?: string,
  age?: string,
  dateOfBirth?: string,
}

function sanitizeRequest (req: Request): DeepPartial<Developer> {
  const rules = {
    name: true,
    gender: true,
    age: true,
    hobby: true,
    dateOfBirth: true,
  }

  return sanitize(req.body, rules)
}

function calculateAge (dateOfBirth: Date): number {
  if (!dateOfBirth.getTime()) throw new ApiError({ code: 'invalidDateString', message: 'Invalid date string' })

  const ageDifferenceMs = Date.now() - dateOfBirth.getTime()
  const ageDate = new Date(ageDifferenceMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

async function list (req: Request, res: Response): Promise<void> {
  const { pagination } = res.locals as LocalsPagination
  const { q = {} } = req.query

  const fields = [
    { name: 'id', rule: 'equal' },
    { name: 'name', rule: 'like' },
    { name: 'hobby', rule: 'like' },
    { name: 'gender', rule: 'equal' },
    { name: 'age', rule: 'equal' },
    { name: 'dateOfBirth', rule: 'equal' }]
  const query: ListQuery = {}

  fields.forEach(field => {
    if (q[field.name]) {
      query[field.name] = field.rule === 'equal' ? q[field.name] : Like(`%${q[field.name].replace(/ /g, '%')}%`)
    }
  })

  const [rows, count] = await Developer.getRepository().createQueryBuilder().where(query).skip(pagination.skip).take(pagination.take).orderBy('id', 'ASC').getManyAndCount()

  res.json(responsePaginationHandler({ rows, count, pagination }))
}

async function show (req: Request, res: Response): Promise<void> {
  res.json(res.locals.developer)
}

async function create (req: Request, res: Response): Promise<void> {
  const developerBody = sanitizeRequest(req)

  const requiredFields = ['name', 'hobby', 'gender', 'dateOfBirth']
  requiredFields.forEach(field => {
    if (!developerBody[field]) throw new RequiredError(field)
  })

  developerBody.age = calculateAge(new Date(req.body.dateOfBirth))

  const newDeveloper = Developer.create(developerBody)
  await newDeveloper.save()

  res.status(201).json(newDeveloper)
}

async function update (req: Request, res: Response): Promise<void> {
  const body = sanitizeRequest(req)

  const { developer } = res.locals as { developer: Developer }

  if (body.dateOfBirth) body.age = calculateAge(new Date(req.body.dateOfBirth))

  developer.setAttributes(body)
  await developer.save()

  res.json(developer)
}

async function destroy (req: Request, res: Response): Promise<void> {
  const { developer } = res.locals as { developer: Developer }
  await developer.remove()

  res.status(204).end()
}

export default {
  list,
  show,
  create,
  update,
  destroy,
}
