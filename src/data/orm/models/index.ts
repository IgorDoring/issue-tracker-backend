import { Sequelize } from 'sequelize'
import { initIssuesModel } from './issues'

export const initModels = (sequelize: Sequelize) => {
    initIssuesModel(sequelize)
}
