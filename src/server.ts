import express from 'express'
import { errorHandling } from './middlewares/error-handling.js'
import { routes } from './routes/index.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = 3333
const app = express()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API for handling restaurant tables and order processing',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/docs/**/*.yaml']
};

const specs = swaggerJsdoc(options)

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(routes)

app.use(errorHandling)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))