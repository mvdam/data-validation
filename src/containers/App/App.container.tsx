import { useMemo, useState } from 'react'
import { Input } from '../../components/Input/Input'
import { App } from '../../components/App/App'
import { Pre } from '../../components/Pre/Pre'
import { User, UserModel, UsersModel } from '../../model/user'
import { create, is } from 'superstruct'

const DEFAULT_FORM_STATE: Partial<User> = {
  name: '',
  email: '',
}

const EXAMPLE_JSON = JSON.stringify({
  users: [
    {
      name: 'John',
      email: 'doe@example.com',
      age: 30,
    },
  ],
})

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'json'>('form')
  const [formState, updateFormState] =
    useState<Partial<User>>(DEFAULT_FORM_STATE)

  const [jsonInput, setJsonInput] = useState(EXAMPLE_JSON)

  const formValid = useMemo(() => is(formState, UserModel), [formState])
  const jsonValid = useMemo(
    () => is(JSON.parse(jsonInput), UsersModel),
    [jsonInput]
  )

  const handleFormChange =
    <K extends keyof User>(key: K) =>
    (value: User[K]) => {
      updateFormState((currentState) => ({
        ...currentState,
        [key]: value,
      }))
    }

  const validateModel = () => {
    try {
      saveUser()
    } catch (e) {
      alert(e)
    }
  }

  const saveUser = () => {
    const user = create(formState, UserModel)
    console.log({ user })
  }

  return (
    <App title="Data Validation Demo">
      <div className="flex space-x-5 items-center">
        <button onClick={() => setActiveTab('form')}>Form validation</button>
        <button onClick={() => setActiveTab('json')}>JSON validation</button>
      </div>
      {activeTab === 'form' && (
        <>
          <Input
            label="Name"
            type="text"
            value={formState.name}
            onChange={handleFormChange('name')}
          />
          <Input
            label="E-mail"
            value={formState.email}
            onChange={handleFormChange('email')}
          />
          <Input
            label="Age"
            type="number"
            value={formState.age?.toString()}
            onChange={(value) => handleFormChange('age')(Number(value))}
          />
          <Pre>{JSON.stringify({ ...formState, formValid }, null, 2)}</Pre>
          <button onClick={validateModel} disabled={!formValid}>
            Submit
          </button>
        </>
      )}

      {activeTab === 'json' && (
        <>
          <textarea
            rows={30}
            cols={100}
            className="rounded-sm p-2 font-mono bg-midnight text-tahiti"
            onChange={(e) => setJsonInput(e.target.value)}
          >
            {jsonInput}
          </textarea>
          <Pre>{JSON.stringify({ jsonValid }, null, 2)}</Pre>
        </>
      )}
    </App>
  )
}

export const fakeUserFetch = () => {
  return Promise.resolve()
}
