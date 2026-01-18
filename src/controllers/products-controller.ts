import { Request, Response, NextFunction } from 'express'
import { knex } from '@/knex.js'
import { z } from 'zod'

export class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query

      const products = await knex<ProductRepository>('products')
        .select()
        .whereLike('name', `%${name ?? ""}%`)
        .orderBy('name')

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
      return response.status(201).json()

    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' }) // Double negative in `!isNaN` makes a positive, that is, if it is a NaN it returns the message. Reads better from inside out. 
        .parse(request.params.id)

      const { name, price } = request.body

      await knex<ProductRepository>('products').update({ name, price, updated_at: knex.fn.now() }).where({ id })

      return response.status(200).json()
    } catch (error) {
      next(error)
    }
  }
}
