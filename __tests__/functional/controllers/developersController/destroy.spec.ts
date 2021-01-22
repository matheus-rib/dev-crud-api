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

it('should return recordNotFound error if passing invalid ID', async () => {
  const { body, status } = await request(api.server).delete(`/developers/${developer.id + 1000}`)

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
  expect(body.additionalProperties).toMatchObject({ model: 'Developer', payload: { id: String(developer.id + 1000) } })
})

it('should return a developer', async () => {
  const { status, body } = await request(api.server).delete(`/developers/${developer.id}`)

  expect(status).toBe(204)
  expect(body).toMatchObject({})

  const storedDeveloper = await Developer.findOne(developer.id)
  expect(storedDeveloper).toBeFalsy()
})
