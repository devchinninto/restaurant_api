import express from 'express'
import { errorHandling } from './middlewares/error-handling.js'
import { routes } from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './docs/swagger.json'


const PORT = 3333
const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(errorHandling)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))