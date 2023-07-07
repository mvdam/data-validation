import { Infer, object, string } from 'superstruct'

export const UserModel = object({
  name: string(),
  email: string(),
})

export type User = Infer<typeof UserModel>
