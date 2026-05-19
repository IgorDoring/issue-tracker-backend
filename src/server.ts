import express, { Express } from 'express'
import helmet from 'helmet'

const port = process.env.PORT || 5000

const app: Express = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
