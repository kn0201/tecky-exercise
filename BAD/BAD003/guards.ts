import express from 'express'
import { client } from './db'
import { HttpError } from './http-error'
import './session'

export async function adminOnlyAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    let is_admin = await isAdmin(req)
    if (!is_admin) {
      throw new HttpError(403, 'This action is only available to admin')
    }
    next()
  } catch (err) {
    next(err)
  }
}

async function isAdmin(req: express.Request): Promise<boolean> {
  let user_id = req.session.user_id || null
  let result = await client.query(
    /* sql */ `
        select is_admin from "user"
        where id = $1
      `,
    [user_id],
  )
  let user = result.rows[0]
  return user?.is_admin
}

export function userOnlyAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.session?.user_id) {
    next()
  } else {
    next(
      new HttpError(
        403,
        'This action is only available to admin/user, not guest',
      ),
    )
  }
}

export async function adminOnlyPage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    let is_admin = await isAdmin(req)
    if (!is_admin) {
      res.status(403)
      res.end('This page is only for admin')
      return
    }
  } catch (error) {
    next(error)
  }
}
