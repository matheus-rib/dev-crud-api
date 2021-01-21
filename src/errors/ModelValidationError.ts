import ApiError from './ApiError'

export default class ModelValidationError extends ApiError {
  constructor (errors) {
    super({
      message: 'Invalid model',
      code: 'modelValidation',
      additionalProperties: { errors },
      httpStatus: 409,
    })
  }
}
