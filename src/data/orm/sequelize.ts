import { Sequelize } from 'sequelize'
import { IssuesModel } from './models/issues'
import { initModels } from './models'
import { issues } from '../../../issues.json'

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME || 'issues',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
})

const addSeedData = async () => {
    await sequelize.transaction(async (transaction) => {
        await IssuesModel.bulkCreate(issues, { transaction })
    })
}

export const initializeModelsAndDatabase = async () => {
    initModels(sequelize)
    console.log('Initializing models and database...')
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ force: true })
        await addSeedData()
    } else {
        await sequelize.sync()
    }
}
