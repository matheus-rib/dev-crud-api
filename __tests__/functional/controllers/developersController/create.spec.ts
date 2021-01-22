import * as faker from 'faker'
import * as request from 'supertest'
import api from '../../../../src/config/Api'
import { DeveloperGenderType } from '../../../../src/utils/enums'

beforeAll(async () => {
  await api.databaseConnection
})

afterAll(async () => {
  await (await api.databaseConnection).close()
})

it('should return a new created developer', async () => {
  const params = {
    name: faker.name.firstName(),
    dateOfBirth: '1997-12-25',
    hobby: 'Programar TS',
    gender: DeveloperGenderType.M,
  }

  const calculateAge = (dateString: string): number => {
    const dateOfBirth = new Date(dateString)
    const ageDifferenceMs = Date.now() - dateOfBirth.getTime()
    const ageDate = new Date(ageDifferenceMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
  const age = calculateAge(params.dateOfBirth)

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(201)
  expect(body.name).toBe(params.name)
  expect(body.dateOfBirth).toBe(params.dateOfBirth)
  expect(body.hobby).toBe(params.hobby)
  expect(body.gender).toBe(params.gender)
  expect(body.age).toBe(age)
})

it('should return nameRequired error if not passing name', async () => {
  const params = {
    dateOfBirth: '1997-12-25',
    hobby: 'Programar TS',
    gender: DeveloperGenderType.M,
  }

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('nameRequired')
})

it('should return dateOfBirthRequired error if not passing dateOfBirth', async () => {
  const params = {
    name: faker.name.firstName(),
    hobby: 'Programar TS',
    gender: DeveloperGenderType.M,
  }

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('dateOfBirthRequired')
})

it('should return error if passing invalid dateOfBirth date string', async () => {
  const params = {
    name: faker.name.firstName(),
    dateOfBirth: '1997-13-25',
    hobby: 'Programar TS',
    gender: DeveloperGenderType.M,
  }

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('invalidDateString')
})

it('should return hobbyRequired error if not passing hobby', async () => {
  const params = {
    name: faker.name.firstName(),
    dateOfBirth: '1997-12-25',
    gender: DeveloperGenderType.M,
  }

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('hobbyRequired')
})

it('should return genderRequired error if not passing gender', async () => {
  const params = {
    name: faker.name.firstName(),
    dateOfBirth: '1997-12-25',
    hobby: 'Programar TS',
  }

  const { body, status } = await request(api.server).post('/developers').send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('genderRequired')
})
