export class AppError {
  message: string
  statusCode: number

  // Sets 400 as default statusCode
  constructor(message: string, statusCode: number = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}