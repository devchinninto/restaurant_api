import { Request, Response, NextFunction } from 'express'
import { knex } from '@/knex.js'
import { z } from 'zod'
import { AppError } from '@/utils/AppError'

export class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>('tables').select().orderBy('table_number')

      return response.json(tables)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_number: z.number()
      })

      const { table_number } = bodySchema.parse(request.body)

      const table = await knex<TableRepository>('tables').select().where({ table_number }).first()

      if (table) {
        throw new AppError('Table already exists.')
      }

      await knex<TableRepository>('tables').insert({ table_number, created_at: knex.fn.now(), updated_at: knex.fn.now() })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' }).parse(request.params.id)

      const table = await knex<TableRepository>('tables').select().where({ id }).first()

      if (!table) {
        throw new AppError('Table not found.')
      }

      await knex<TableRepository>('tables').delete().where({ id })

      return response.json()
    } catch (error) {
      next(error)
    }
  }
}