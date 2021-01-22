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

it('should return a developer', async () => {
  const { body, status } = await request(api.server).get(`/developers/${developer.id}`)

  expect(status).toBe(200)

  expect(body.name).toBe(developer.name)
  expect(body.gender).toBe(developer.gender)
  expect(body.age).toBe(developer.age)
  expect(body.hobby).toBe(developer.hobby)
  expect(new Date(body.dateOfBirth)).toStrictEqual(developer.dateOfBirth)
})

it('should return recordNotFound error if passing invalid ID', async () => {
  const { body, status } = await request(api.server).get(`/developers/${developer.id + 1000}`)

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
  expect(body.additionalProperties).toMatchObject({ model: 'Developer', payload: { id: String(developer.id + 1000) } })
})
