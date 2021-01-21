type ErrorParams = {
  message: string
  code: string
  additionalProperties?: any
  httpStatus?: number
}

export default class ApiError {
  public code: string
  public message: string
  public additionalProperties: any
  public httpStatus: number

  constructor ({ message, code = 'unknown', additionalProperties = {}, httpStatus = 400 }: ErrorParams) {
    this.message = message
    this.code = code
    this.additionalProperties = additionalProperties
    this.httpStatus = httpStatus
  }
}
