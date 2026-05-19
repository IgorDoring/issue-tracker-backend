import express, { Express } from 'express'
import helmet from 'helmet'
import { createRoutes } from './routes'
import { initializeModelsAndDatabase, sequelize } from './data/orm/sequelize'

const port = process.env.PORT || 5000

const app: Express = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

createRoutes(app)

async function bootstrap() {
    try {
        await initializeModelsAndDatabase()
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(error)

        process.exit(1)
    }
}

bootstrap()
