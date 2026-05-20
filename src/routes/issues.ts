import { Express } from 'express'
import { IssuesModel } from '../data/orm/models/issues'

export const createIssuesRoutes = (app: Express) => {
    app.get('/issues', async (req, res) => {
        const issues = await IssuesModel.findAll()
        res.json(issues)
    })
}
