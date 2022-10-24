export class AppError extends Error {
  public readonly statusCode: number
  public readonly status: string

  constructor (message: string, statusCode = 404, status = 'Error') {
    super(message)
    this.statusCode = statusCode
    this.status = status
  }
}
