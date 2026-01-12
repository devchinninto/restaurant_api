import { Request, Response, NextFunction } from 'express'
import { knex } from '@/knex.js'
import { z } from 'zod'

export class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await knex('products').select()

      return response.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().min(6),
        price: z.number().gt(0)
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductRepository>('products').insert({ name, price })
      return response.status(201).json({ message: `Product registered successfully!` })

    } catch (error) {
      next(error)
    }
  }
}
