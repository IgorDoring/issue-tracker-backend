import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { UserModel } from '../data/orm/models/users'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!
}

export const configurePassport = () => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await UserModel.findByPk(payload.sub)
                if (!user) return done(null, false)
                return done(null, user)
            } catch (err) {
                return done(err, false)
            }
        })
    )
}
