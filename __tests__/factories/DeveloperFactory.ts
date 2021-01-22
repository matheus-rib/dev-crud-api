import * as faker from 'faker'
import { Developer } from '../../src/entity/Developer'
import { DeveloperGenderType } from '../../src/utils/enums'

type DevelopersParams = {
  name?: string,
  gender?: DeveloperGenderType,
  age?: number,
  hobby?: string,
  dateOfBirth?: Date,
}

async function create (params?: DevelopersParams): Promise<Developer> {
  const developer = Developer.create({
    name: faker.name.firstName(),
    age: faker.random.number(),
    hobby: faker.random.words(),
    dateOfBirth: faker.date.past(),
    gender: DeveloperGenderType.M,
    ...params,
  })

  return developer.save()
}

export default { create }
