import { Request, Response, NextFunction } from 'express'
import { AppError } from "@/utils/AppError.js";

export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) {
  // Custom error handling
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  // Else, return generic 500 status code and error message.
  return response.status(500).json({ message: error.message })
}