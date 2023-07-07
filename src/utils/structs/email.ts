import { define } from 'superstruct'
import isEmail from 'validator/es/lib/isEmail'

export const email = () =>
  define<string>('email', (value) =>
    typeof value === 'string' ? isEmail(value) : false
  )
