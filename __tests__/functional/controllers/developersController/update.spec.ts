import { deepClone } from 'paliari-js-utils'
import * as request from 'supertest'
import api from '../../../../src/config/Api'
import { Developer } from '../../../../src/entity/Developer'
import DeveloperFactory from '../../../factories/DeveloperFactory'

let developer: Developer = null

beforeAll(async () => {
  await api.databaseConnection

  developer = await DeveloperFactory.create({ name: 'Matheus', age: 23, hobby: 'Programar em TS e fazer testes', dateOfBirth: new Date('1997-12-25') })
})

afterAll(async () => {
  await (await api.databaseConnection).close()
})

it('should update the passed fields and return a developer', async () => {
  const developerCopy = deepClone(developer) as Developer

  const params = {
    name: 'Marcos',
    dateOfBirth: '1998-12-25',
  }

  const calculateAge = (dateString: string): number => {
    const dateOfBirth = new Date(dateString)
    const ageDifferenceMs = Date.now() - dateOfBirth.getTime()
    const ageDate = new Date(ageDifferenceMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const { body, status } = await request(api.server).put(`/developers/${developer.id}`).send(params)

  expect(status).toBe(200)

  expect(body.name).toBe(params.name)
  expect(body.gender).toBe(developerCopy.gender)
  expect(body.age).toBe(calculateAge(params.dateOfBirth))
  expect(body.hobby).toBe(developerCopy.hobby)
  expect(body.dateOfBirth).toStrictEqual(params.dateOfBirth)

  const storedDeveloper = await Developer.findOne(developer.id)
  expect(body.name).toBe(storedDeveloper.name)
  expect(body.gender).toBe(storedDeveloper.gender)
  expect(body.age).toBe(storedDeveloper.age)
  expect(body.hobby).toBe(storedDeveloper.hobby)
  expect(new Date(body.dateOfBirth)).toStrictEqual(storedDeveloper.dateOfBirth)
})

it('should return recordNotFound error if passing invalid ID', async () => {
  const { body, status } = await request(api.server).put(`/developers/${developer.id + 1000}`)

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
  expect(body.additionalProperties).toMatchObject({ model: 'Developer', payload: { id: String(developer.id + 1000) } })
})
