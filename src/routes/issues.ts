import { Express } from 'express'
import { sequelize } from '../data/orm/sequelize'
import { IssuesModel } from '../data/orm/models/issues'

export const createIssuesRoutes = (app: Express) => {
    app.get('/issues', async (req, res) => {
        console.log('Fetching issues...')
        const issues = await IssuesModel.findAll()
        res.json(issues)
    })
}
