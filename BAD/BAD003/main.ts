import express, { Request, Response, NextFunction } from 'express'
import { print } from 'listening-on'
import dayjs from 'dayjs'
import path from 'path'
import { adminOnlyPage } from './guards'
import { memoRouter } from './memo'
import { HttpError } from './http-error'
import { env } from './env'
import { sessionMiddleware } from './session'
import http from 'http'
import { attachServer } from './socket'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { client } from './db'

const app = express()
const server = http.createServer(app)
attachServer(server)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(sessionMiddleware)

app.use((req, res, next) => {
  let counter = req.session.counter || 0
  counter++
  req.session.counter = counter
  let timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.log(`[${timestamp}] ${req.method} ${req.url} (${counter})`)
  next()
})

app.get('/', (req, res) => {
  res.redirect('/public')
})

app.use('/public', express.static('public'))
app.use('/uploads', express.static('uploads'))

let userService = new UserService(client)
let userController = new UserController(userService)
app.use(userController.router)

app.use(memoRouter)

// admin.html should be inside protected
app.use('/admin', adminOnlyPage, express.static('protected'))

app.use((req, res, next) => {
  if (req.headers.accept?.includes('application/json')) {
    let message = `route not found, method: ${req.method}, url: ${req.url}`
    next(new HttpError(404, message))
    return
  }
  res.status(404)
  res.sendFile(path.resolve('public', '404.html'))
})

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500)
  res.json({ error: String(error) })
})

let port = env.PORT
server.listen(port, () => {
  print(port)
})
