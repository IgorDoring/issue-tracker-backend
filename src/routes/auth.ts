import { Express } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../data/orm/models/users'
import { config as dotenvconfig } from 'dotenv'

dotenvconfig()

const jwtSecret = process.env.JWT_SECRET || 'mysecret'

export const createAuthRoutes = (app: Express) => {
    app.post('/login', async (req, res) => {
        const { username, password } = req.body
        if (!username || !password)
            return res.status(400).json({ message: 'Username and password required' })

        try {
            const user = await UserModel.findOne({ where: { username, password } })
            if (!user) return res.status(401).json({ message: 'Invalid credentials' })

            const token = jwt.sign({ sub: user.id }, jwtSecret, {
                expiresIn: '1h'
            })
            res.json({ token })
        } catch {
            res.status(500).json({ message: 'Login failed' })
        }
    })
}
