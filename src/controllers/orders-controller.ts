import { Request, Response, NextFunction } from 'express'
import { knex } from '@/knex.js'
import { z } from 'zod'
import { AppError } from '@/utils/AppError'
import { ordersRoutes } from '@/routes/orders-routes'


class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number()
      })

      const { table_session_id, product_id, quantity } = bodySchema.parse(request.body)

      const session = await knex<TableSessionRepository>('tables_sessions').select().where({ id: table_session_id }).first()

      if (!session) {
        throw new AppError('Session not found, cannot place order')
      }

      if (session.closed_at) {
        throw new AppError('Session is closed, cannot place order.')
      }

      const product = await knex<ProductRepository>('products').select().where({ id: product_id }).first()

      if (!product) {
        throw new AppError('Product not found')
      }

      await knex('orders').insert({ table_session_id, product_id, quantity, price: product.price })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const table_session_id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' }).parse(request.params.id)

      const order = await knex<OrderRepository>('orders')
        .select(
          'orders.id',
          'orders.table_session_id',
          'orders.product_id',
          'products.name',
          'orders.quantity',
          'orders.price',
          knex.raw('(orders.price * orders.quantity) AS total'),
          'orders.created_at',
          'orders.updated_at')
        .join('products', 'products.id', 'orders.product_id')
        .where({ table_session_id })
        .orderBy('orders.created_at', 'desc')

      return response.json(order)
    } catch (error) {
      next(error)
    }
  }

  async showTotal(request: Request, response: Response, next: NextFunction) {
    try {
      const table_session_id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' }).parse(request.params.id)

      const order = await knex<OrderRepository>('orders').select(
        knex.raw('COALESCE(SUM(orders.price * orders.quantity), 0) AS total'),
        knex.raw('COALESCE(orders.quantity, 0) AS quantity')
      ).where({ table_session_id }).first()

      return response.json(order)

    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController }