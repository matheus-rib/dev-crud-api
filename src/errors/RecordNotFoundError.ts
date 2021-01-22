import ApiError from './ApiError'

export default class RecordNotFoundError extends ApiError {
  constructor (model, payload, additionalProperties = {}) {
    super({
      message: 'Record not found',
      code: 'recordNotFound',
      additionalProperties: {
        ...additionalProperties,
        model,
        payload,
      },
      httpStatus: 404,
    })
  }
}
