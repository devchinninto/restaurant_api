import { Request, Response, NextFunction } from 'express'
import { knex } from '@/knex.js'
import { z } from 'zod'
import { AppError } from '@/utils/AppError'
import { table } from 'console'

export class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number()
      })

      const { table_id } = bodySchema.parse(request.body)

      const session = await knex<TableSessionRepository>('tables_sessions').select().where({ table_id }).orderBy('opened_at', 'desc').first()

      if (session && !session.closed_at) {
        throw new AppError('This table is already open.')
      }

      await knex<TableSessionRepository>('tables_sessions').insert({ table_id, opened_at: knex.fn.now() })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const session = await knex<TableSessionRepository>('tables_sessions').select().orderBy('closed_at')

      return response.json(session)
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' }).parse(request.params.id)

      const session = await knex<TableSessionRepository>('tables_sessions').select().where({ id }).first()

      if (!session) {
        throw new AppError('Table session not found.')
      }

      if (session.closed_at) {
        throw new AppError('Table is already closed.')
      }

      await knex<TableSessionRepository>('tables_sessions').update({ closed_at: knex.fn.now() }).where({ id })

      return response.json()

    } catch (error) {
      next(error)
    }
  }
}