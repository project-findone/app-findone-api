export class AppError extends Error {
  public readonly statusCode: number

  constructor (message: string, statusCode = 404) {
    super(message)
    this.statusCode = statusCode
  }
}
