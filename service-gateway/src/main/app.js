import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger-output.json'

import { exposeRoutes } from './routes'

const app = express()

app.use(json())

app.use(helmet())

const whiteList = [
    //   'https://google.com',
]

const corsOptions = {
    origin(origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}

app.use(process.env.NODE_ENV === 'production' ? cors(corsOptions) : cors())

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,

    max: 500,

    message: {
        status: 429,

        message:
            'Você fez muitas requisições em um curto período de tempo. Aguarde 5 minutos e tente novamente.',
    },
})

app.use(limiter)

app.use(exposeRoutes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
