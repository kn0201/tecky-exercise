// DTO -> data transfer object

export type LoginUserDTO = {
  username: string
  password: string
}

export type RegisterUserDTO = {
  username: string
  password: string
}

export type SessionUser = {
  id: number
  is_admin: boolean
  username: string
}
