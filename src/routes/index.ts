import { Router } from 'express'
import { tablesRoutes } from './tables-routes.js'
import { productsRoutes } from './products-routes.js'

const routes = Router()

routes.use('/products', productsRoutes)
routes.use('/tables', tablesRoutes)

export { routes }