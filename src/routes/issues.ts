import { Express } from 'express'
import { IssuesModel } from '../data/orm/models/issues'
import { idParamSchema, issueSchema } from '../validation/issues_validation'

export const createIssuesRoutes = (app: Express) => {
    app.get('/issues', async (req, res) => {
        const issues = await IssuesModel.findAll()
        res.json(issues)
    })
    app.get('/issues/:id', async (req, res) => {
        const id = req.params.id
        const { error } = idParamSchema.validate(id)
        if (error) return res.status(400).json({ message: error.message })
        try {
            const issue = await IssuesModel.findByPk(id)
            if (!issue) return res.status(404).json({ message: 'Issue not found' })
            res.status(200).json(issue)
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch issue ' + id })
        }
    })
    app.post('/issues', async (req, res) => {
        const newIssue = req.body
        const { error, value } = issueSchema.validate(newIssue)
        if (error) return res.status(400).json({ message: error.message })
        try {
            const addedIssue = await IssuesModel.create({ ...value })
            res.status(201).json(addedIssue)
        } catch (error) {
            res.status(500).json({ message: 'Failed to create issue' })
        }
    })
}
