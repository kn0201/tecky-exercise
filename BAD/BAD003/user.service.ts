import { Client } from 'pg'
import { HttpError } from './http-error'
import { LoginUserDTO, RegisterUserDTO, SessionUser } from './user.types'

export class UserService {
  constructor(private client: Client) {}

  async login(input: LoginUserDTO): Promise<SessionUser> {
    let result = await this.client.query(
      /* sql */ `
			select id, is_admin
			from "user"
			where username = $1
			  and password = $2
		`,
      [input.username, input.password],
    )
    let user = result.rows[0]
    if (!user) throw new HttpError(401, 'wrong username or password')

    return {
      id: user.id,
      is_admin: user.is_admin,
      username: input.username,
    }
  }

  async register(input: RegisterUserDTO): Promise<SessionUser> {
    let result = await this.client.query(
      /* sql */ `
      insert into "user"
      (username, password, is_admin)
      values
      ($1, $2, false)
      returning id
		`,
      [input.username, input.password],
    )
    let user = result.rows[0]
    return {
      id: user.id,
      is_admin: false,
      username: input.username,
    }
  }
}
