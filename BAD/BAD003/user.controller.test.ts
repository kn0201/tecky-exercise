import { Request } from 'express'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SessionUser } from './user.types'

let userService: UserService
let userController: UserController
let loginMock: jest.Mock
let req: Request

beforeEach(() => {
  userService = {} as any
  loginMock = jest.fn(async () => ({
    id: 1,
    username: 'alice',
    is_admin: true,
  }))
  userService.login = loginMock

  userController = new UserController(userService)

  req = {} as any
  req.body = {}
  req.session = {} as any
  req.session.save = jest.fn()
})

describe('login API', () => {
  it('should reject when missing username', () => {
    req.body = { password: '123456' }
    expect(userController.login(req)).rejects.toThrowError('missing "username"')
    expect(userService.login).not.toBeCalled()
  })
  it('should reject when missing password', () => {
    req.body = { username: '123456' }
    expect(userController.login(req)).rejects.toThrowError('missing "password"')
    expect(userService.login).not.toBeCalled()
  })
  it('should reject when password is shorter than 6 characters', () => {
    req.body = { username: '12345', password: '12345' }
    expect(userController.login(req)).rejects.toThrowError(
      // /password.*minLength should be 6/,
      '"body.password", minLength should be 6',
    )
    expect(userService.login).not.toBeCalled()
  })
  it('should pass to userService.login when username and password are valid', () => {
    req.body = { username: 'alice', password: '123456' }

    expect(userController.login(req)).resolves.not.toThrowError()
    expect(userService.login).toBeCalledWith(req.body)
  })
  it('should remove extra spaces in username before pass to userService.login', () => {
    req.body = { username: 'alice ', password: '123456' }

    expect(userController.login(req)).resolves.not.toThrowError()
    expect(userService.login).toBeCalledWith({
      username: 'alice',
      password: '123456',
    })
  })
  it('should return user role according to userService.login result', () => {
    req.body = { username: 'alice', password: '123456' }

    loginMock.mockResolvedValue({ is_admin: true })
    expect(userController.login(req)).resolves.toEqual({
      role: 'admin',
      username: 'alice',
    })

    loginMock.mockResolvedValue({ is_admin: false })
    expect(userController.login(req)).resolves.toEqual({
      role: 'user',
      username: 'alice',
    })
  })
  it('should store the user into session when login success', async () => {
    req.body = { username: 'alice', password: '123456' }

    let sessionUser: SessionUser = { id: 1, is_admin: true, username: 'alice' }
    loginMock.mockResolvedValue(sessionUser)
    await userController.login(req)
    // console.log('(inside test case) session:', req.session)
    expect(req.session.user).toEqual(sessionUser)
  })
})

describe('register API', () => {})

describe('logout API', () => {})

describe('getRole API', () => {})
