import { randomBytes } from 'crypto'
import expressSession from 'express-session'
import { SessionUser } from './user.types'

declare module 'express-session' {
  interface SessionData {
    counter: number
    user: SessionUser
  }
}

export let sessionMiddleware = expressSession({
  resave: false,
  secret: randomBytes(32).toString('hex'),
  saveUninitialized: false,
})
