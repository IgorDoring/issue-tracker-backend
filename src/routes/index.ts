import { Express } from 'express'
import { createIssuesRoutes } from './issues'
import { createAuthRoutes } from './auth'

export const createRoutes = (app: Express) => {
    createAuthRoutes(app)
    createIssuesRoutes(app)
}
