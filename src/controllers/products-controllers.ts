import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/app-error'
import { knex } from '@/database/knex'
import { z } from 'zod'

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await knex<ProductRepository>('products').select()
      return response.json(products)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex('products').insert({ name, price })

      return response.status(201).json('Product registered!')

    } catch (error) {
      next(error)
    }
  }
}

export { ProductController }