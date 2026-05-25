import passport from 'passport'
import { Express } from 'express'

export const authMiddleware = (app: Express) => {
    app.use(passport.initialize())
}

export const requireAuth = passport.authenticate('jwt', { session: false })
