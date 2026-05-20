import { Express } from 'express'
import { IssuesModel } from '../data/orm/models/issues'
import { idParamSchema } from '../validation/issues_validation'

export const createIssuesRoutes = (app: Express) => {
    app.get('/issues', async (req, res) => {
        const issues = await IssuesModel.findAll()
        res.json(issues)
    })
    app.get('/issues/:id', async (req, res) => {
        const id = req.params.id
        const { error } = idParamSchema.validate(id)
        if (error) {
            res.status(500).json({ message: error.message })
        } else {
            const issue = await IssuesModel.findByPk(id)
            res.status(400).json(issue)
        }
    })
}
