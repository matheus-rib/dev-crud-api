import * as request from 'supertest'
import api from '../../../../src/config/Api'
import { Developer } from '../../../../src/entity/Developer'
import { DeveloperGenderType } from '../../../../src/utils/enums'
import DeveloperFactory from '../../../factories/DeveloperFactory'

let developer1: Developer = null
let developer2: Developer = null
let developer3: Developer = null

beforeAll(async () => {
  await api.databaseConnection

  developer1 = await DeveloperFactory.create({ name: 'Matheus', age: 23, hobby: 'Programar em TS e fazer testes', dateOfBirth: new Date('1997-12-25') })
  developer2 = await DeveloperFactory.create({ name: 'Lucas', age: 23, hobby: 'Programar em Java', dateOfBirth: new Date('1997-11-28') })
  developer3 = await DeveloperFactory.create({ name: 'Maria', age: 20, hobby: 'Programar em Python', gender: DeveloperGenderType.F, dateOfBirth: new Date('2000-06-25') })
})

afterAll(async () => {
  await (await api.databaseConnection).close()
})

it('should return a paginated developers list with 3 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/developers')

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
      expect.objectContaining({ name: developer2.name, age: developer2.age, hobby: developer2.hobby, gender: developer2.gender }),
      expect.objectContaining({ name: developer3.name, age: developer3.age, hobby: developer3.hobby, gender: developer3.gender }),
    ]),
  )
})

it('should return a paginated developers list filtered by age with 2 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ q: { age: developer1.age } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(2)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
      expect.objectContaining({ name: developer2.name, age: developer2.age, hobby: developer2.hobby, gender: developer2.gender }),
    ]),
  )
})

it('should return a paginated developers list filtered by name with 1 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ q: { name: developer1.name.substring(0, 3) } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
    ]),
  )
})

it('should return a paginated developers list filtered by hobbie with 2 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ q: { hobbie: 'Programar' } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
      expect.objectContaining({ name: developer2.name, age: developer2.age, hobby: developer2.hobby, gender: developer2.gender }),
      expect.objectContaining({ name: developer3.name, age: developer3.age, hobby: developer3.hobby, gender: developer3.gender }),
    ]),
  )
})

it('should return a paginated developers list filtered by dateOfBirth with 2 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ q: { dateOfBirth: developer1.dateOfBirth } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
    ]),
  )
})

it('should return a paginated developers list with 1 rows, 3 pages and on page 1', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ page: 1, take: 1 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer1.name, age: developer1.age, hobby: developer1.hobby, gender: developer1.gender }),
    ]),
  )
})

it('should return a paginated developers list with 1 rows, 3 pages and on page 2', async () => {
  const { body, status } = await request(api.server).get('/developers').query({ page: 2, take: 1 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(2)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: developer2.name, age: developer2.age, hobby: developer2.hobby, gender: developer2.gender }),
    ]),
  )
})
