import { object, string } from 'cast.ts'
import { Request, Router } from 'express'
import { HttpError } from './http-error'
import { UserService } from './user.service'
import './session'
import { RestController } from './rest.controller'

let loginParser = object({
  body: object({
    username: string({ trim: true, nonEmpty: true }),
    password: string({ trim: true, nonEmpty: true, minLength: 6 }),
  }),
})

let registerParser = object({
  body: object({
    username: string({ trim: true, nonEmpty: true }),
    password: string({ trim: true, nonEmpty: true, minLength: 6 }),
  }),
})

export class UserController extends RestController {
  constructor(private userService: UserService) {
    super()
    this.router.post('/login', this.wrapMethod(this.login))
    this.router.post('/register', this.wrapMethod(this.register))
    this.router.post('/logout', this.wrapMethod(this.logout))
    this.router.get('/role', this.wrapMethod(this.getRole))
  }

  async login(req: Request) {
    let { body } = loginParser.parse(req)

    // console.log('before userService.login')
    let user = await this.userService.login(body)
    // console.log('after userService.login, got user:', user)

    // console.log('before save user to session')
    req.session.user = user
    // console.log('after save user to session')

    // console.log('saved session:', req.session)

    return {
      role: user.is_admin ? 'admin' : 'user',
      username: body.username,
    }
  }

  async register(req: Request) {
    let { body } = registerParser.parse(req)

    let user = await this.userService.register(body)

    req.session.user = user

    return {
      role: user.is_admin ? 'admin' : 'user',
      username: body.username,
    }
  }

  async logout(req: Request) {
    // delete req.session.user
    await new Promise<void>((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          reject(new HttpError(502, 'Failed to destroy session: ' + err))
        } else {
          resolve()
        }
      })
    })
    return { role: 'guest' }
  }

  async getRole(req: Request) {
    let user = req.session.user
    if (!user) {
      return {
        role: 'guest',
      }
    }
    return {
      role: user.is_admin ? 'admin' : 'user',
      username: user.username,
    }
  }
}
