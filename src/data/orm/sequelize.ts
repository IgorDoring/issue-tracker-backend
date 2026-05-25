import { Sequelize } from 'sequelize'
import { IssuesModel } from './models/issues'
import { initModels } from './models'
import { issues } from '../../../issues.json'
import { users } from '../../../users.json'
import { UserModel } from './models/users'

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
})

const addSeedData = async () => {
    await sequelize.transaction(async (transaction) => {
        await IssuesModel.bulkCreate(issues, { transaction })
        await UserModel.bulkCreate(users, { transaction })
    })
}

export const initializeModelsAndDatabase = async () => {
    initModels(sequelize)
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ force: true })
        await addSeedData()
    } else {
        await sequelize.sync()
        const count = await IssuesModel.count()
        if (count === 0) {
            await addSeedData()
        }
    }
}
