export class AppError {
  public readonly statusCode: number
  public readonly message: string

  constructor (message: string, statusCode = 404) {
    this.message = message
    this.statusCode = statusCode
  }
}
