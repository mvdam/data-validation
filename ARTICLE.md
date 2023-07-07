### Notes

TODOS:

- check for string normalization support, (NFKC) (https://joi.dev/api/?v=17.9.1)
- extend pros & cons for every framework
- article + conclusion
- rephrase Unicode normalization text - https://withblue.ink/2019/03/11/why-you-need-to-normalize-unicode-strings.html
- mention https://towardsdatascience.com/what-on-earth-is-unicode-normalization-56c005c55ad0

---

Superstruct (977k downloads)

- Does not include logic for checking complex strings such as e-mail addresses, see https://zod.dev/?id=strings
- Only supports basic JS types by default, rest is opt-in
- Slightly nicer API to use
- Relatively lightweight: 160KB
- Relatively new library
- Works great with TypeScript, Type Narrowing (Type Guard) works
- Generates nice error messages by default

Zod (4m downloads)

- Much heavier, +600KB
- Larger community, lots of X-to-Zod libraries
- Lacks user-friendly Type Narrowing (Type Guard) support

Yup (4m downloads)

- Since v1.0 rewrite typesafe
- Very similar to Superstrict in its API but TypeScript integration is rough
- Option to have sync or async validations, plugging it into API-calls can be done out-of-the-box
- Type Narrowing (Type Guard) support could be improved

io-ts (920k downloads)

- "Functional version of Zod", uses functional programming patterns
- Excellent TypeScript support
- Works nicely with fp-ts

Joi (7.5m downloads)

- Very popular library
- Lacks Type Narrowing support, and other Types
- Offers [Unicode normalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) for improved data sanitization

### Requirements

- Be able to define and validate models against user input
- Be able to validate models against API endpoints
- Reusable schemas between frontend and backend
- First-class TypeScript support

---

### Important concepts for data-validation and sanitizing

- Unicode normalization

  When dealing with user input this is very important. When not done correctly it can cause unexpected bugs, such as records not found in a database, passwords mismatching letting users unable to authenticate, etc.

### Why using a library for data validating

- Runtime type & data checking
- Can be used on frontend and backend, use same Schemas application-wide
- Check API call responses for expected results
- Less risk for data validation mistakes by developer, use the power of open source validation rules
- Seamless integration when used with TypeScript

### Schema

#### Superstruct

```ts
const UserSchema = object({
  name: size(string(), 2, 30),
  age: size(number(), 1, 110),
})

type User = Infer<typeof UserSchema>

// validate
assert({ name: 'Mary', age: 22 }, UserSchema)
is({ name: 'Mary', age: 42 }, UserSchema)
```

#### Zod

```ts
const UserSchema = z.object({
  name: z.string().min(2).max(30),
  age: z.number().min(1).max(110),
})

type User = z.infer<typeof UserSchema>

// validate
UserSchema.parse({ name: 'Mary', age: 42 })
```

#### Yup

```ts
const UserSchema = object({
  name: string().required().min(2).max(30),
  age: number().required().positive().integer().min(1).max(110),
})

type User = InferType<typeof UserSchema>

// validate
const user = await userSchema.validate({ name: 'Mary', age: 42 })
```
