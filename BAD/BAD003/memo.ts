import { Router } from 'express'
import formidable from 'formidable'
import { adminOnlyAPI, userOnlyAPI } from './guards'
import { toArray, uploadDir } from './upload'
import crypto from 'crypto'
import { client } from './db'
import { HttpError } from './http-error'
import { io } from './socket'

export let memoRouter = Router()

memoRouter.get('/memos', async (req, res, next) => {
  try {
    let result = await client.query(
      /* sql */ `
			-- select id, content, filename from memo

      select
        memo.id
      , memo.content
      , count("like".id) as is_liked
      from memo
      left join "like" on "like".memo_id = memo.id and "like".user_id = $1
      group by memo.id
      order by memo.id asc;
		`,
      [req.session.user_id || null],
    )
    let memos = result.rows
    res.json({ memos })
  } catch (error) {
    next(error)
  }
})

memoRouter.post('/memos', (req, res, next) => {
  let form = formidable({
    uploadDir,
    maxFileSize: 300 * 1024,
    allowEmptyFiles: false,
    filter(part) {
      return part.mimetype?.startsWith('image/') || false
    },
    filename(name, ext, part, form) {
      return crypto.randomUUID() + '.' + part.mimetype?.split('/').pop()
    },
  })
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) throw new HttpError(400, String(err))

      let image = toArray(files.image)[0]
      // let filename = image ? image.newFilename : undefined
      let filename = image?.newFilename

      let content = toArray(fields.content)[0]
      if (!content) throw new HttpError(400, 'missing content')

      let result = await client.query(
        /* sql */ `
			insert into memo (content, filename) values ($1, $2)
			returning id
		`,
        [content, filename],
      )

      let id = result.rows[0].id

      res.json({})

      io.emit('new-memo', { id, content, filename })
    } catch (error) {
      next(error)
    }
  })
})

memoRouter.delete('/memos/:id', adminOnlyAPI, async (req, res, next) => {
  try {
    let id = +req.params.id
    if (!id) throw new HttpError(400, 'invalid memo id')

    await client.query(
      /* sql */ `
			delete from memo
			where id = $1
		`,
      [id],
    )

    res.json({})
  } catch (error) {
    next(error)
  }
})

memoRouter.post('/memos/:id/likes', userOnlyAPI, async (req, res, next) => {
  try {
    let user_id = req.session.user_id
    let memo_id = req.params.id

    let result = await client.query(
      /* sql */ `
      select id from "like"
      where user_id = $1 and memo_id = $2
    `,
      [user_id, memo_id],
    )

    if (result.rowCount == 0) {
      await client.query(
        /* sql */ `
      insert into "like"
      (user_id, memo_id)
      values
      ($1,$2)
    `,
        [user_id, memo_id],
      )
    }

    res.json({})
  } catch (error) {
    next(error)
  }
})

memoRouter.delete('/memos/:id/likes', userOnlyAPI, async (req, res, next) => {
  try {
    let user_id = req.session.user_id
    let memo_id = req.params.id

    await client.query(
      /* sql */ `
      delete from "like"
      where user_id = $1 and memo_id = $2
    `,
      [user_id, memo_id],
    )

    res.json({})
  } catch (error) {
    next(error)
  }
})
