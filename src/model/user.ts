import { Infer, number, object, string, size, array } from 'superstruct'
import { email } from '../utils/structs/email'

export const UserModel = object({
  name: size(string(), 2, 30),
  email: email(),
  age: size(number(), 1, 110),
})

export const UsersModel = object({
  users: array(UserModel),
})

export type User = Infer<typeof UserModel>
