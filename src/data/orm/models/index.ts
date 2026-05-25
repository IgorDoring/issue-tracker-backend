import { Sequelize } from 'sequelize'
import { initIssuesModel } from './issues'
import { initUserModel } from './users'

export const initModels = (sequelize: Sequelize) => {
    initIssuesModel(sequelize)
    initUserModel(sequelize)
}
