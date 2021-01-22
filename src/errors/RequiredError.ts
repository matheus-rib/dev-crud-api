import ApiError from './ApiError'

export default class RequiredError extends ApiError {
  constructor (field: string, status = 400, errors = null) {
    super({
      httpStatus: status,
      code: `${field}Required`,
      message: `The field ${field} is required`,
      additionalProperties: { errors },
    })
  }
}
