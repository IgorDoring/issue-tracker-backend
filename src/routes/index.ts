import { Express } from 'express'
import { createIssuesRoutes } from './issues'

export const createRoutes = (app: Express) => {
    createIssuesRoutes(app)
}
