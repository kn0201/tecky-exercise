import { NextFunction, Request, Response, Router } from 'express'

export class RestController {
  router = Router()

  wrapMethod(method: (req: Request) => Promise<object>) {
    method = method.bind(this)
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let json = await method(req)
        res.json(json)
      } catch (error) {
        next(error)
      }
    }
  }
}
