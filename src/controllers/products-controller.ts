import { Request, Response, NextFunction } from 'express'

export class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json({ message: 'Ok!' })
    } catch (error) {
      next(error)
    }
  }
}
