import { Request, Response } from 'express'
import { sanitize } from 'paliari-js-utils'
import { DeepPartial } from 'typeorm'
import { Developer } from '../entity/Developer'
import RequiredError from '../errors/RequiredError'

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

async function list (req: Request, res: Response): Promise<void> {
  const developers = await Developer.findAndCount()

  res.json(developers)
}

async function show (req: Request, res: Response): Promise<void> {
  res.json(res.locals.developer)
}

async function create (req: Request, res: Response): Promise<void> {
  const developerBody = sanitizeRequest(req)

  const requiredFields = ['name', 'age', 'hobby', 'gender', 'dateOfBirth']
  requiredFields.forEach(field => {
    if (!developerBody[field]) throw new RequiredError(field)
  })

  const newDeveloper = Developer.create(developerBody)
  await newDeveloper.save()

  res.status(201).json(newDeveloper)
}

async function update (req: Request, res: Response): Promise<void> {
  const body = sanitizeRequest(req)

  const { developer } = res.locals as { developer: Developer }

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
