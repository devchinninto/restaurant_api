import { Router } from 'express'
import { productsRoutes } from './products-routes.js'

const routes = Router()

routes.use('/', productsRoutes)

export { routes }