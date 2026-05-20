import { Express } from 'express'
import { IssuesModel } from '../data/orm/models/issues'
import { idParamSchema, issueSchema, updateIssueSchema } from '../validation/issues_validation'

export const createIssuesRoutes = (app: Express) => {
    app.get('/issues', async (req, res) => {
        const page = Number.parseInt(req.query.page?.toString() ?? '1')
        const pageSize = Number.parseInt(req.query.pageSize?.toString() ?? '3')

        const issues = await IssuesModel.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize
        })
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
    app.put('/issues/:id', async (req, res) => {
        const toUpdateIssue = req.body
        const issueNo = req.params.id

        const { error, value } = updateIssueSchema.validate(toUpdateIssue)
        if (error) return res.status(400).json({ message: error.message })

        try {
            const issue = await IssuesModel.findByPk(issueNo)
            if (!issue) return res.status(404).json({ message: 'Issue not found' })
            await IssuesModel.update({ ...value }, { where: { issueNo } })
            const updatedIssue = await IssuesModel.findByPk(req.params.id)
            res.status(200).json(updatedIssue)
        } catch (error) {
            res.status(500).json({ message: 'Failed to update issue' })
        }
    })
    app.delete('/issues/:id', async (req, res) => {
        const issueNo = req.params.id

        try {
            const issue = await IssuesModel.findByPk(issueNo)
            if (!issue) return res.status(404).json({ message: 'Issue not found' })
            await IssuesModel.destroy({ where: { issueNo } })
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete issue' })
        }
    })
}
