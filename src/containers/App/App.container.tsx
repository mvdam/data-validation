import { useState } from 'react'
import { Input } from '../../components/Input/Input'
import './App.container.css'

type FormState = {
  name: string
}

const DEFAULT_FORM_STATE: FormState = {
  name: '',
}

export const App = () => {
  const [formState, updateFormState] = useState<FormState>(DEFAULT_FORM_STATE)

  const handleFormChange =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      updateFormState((currentState) => ({
        ...currentState,
        [key]: value,
      }))
    }

  return (
    <div>
      <div className="flex flex-col space-y-10">
        <h1 className="text-3xl font-bold underline">Data Validation Demo</h1>
        <Input
          label="Name"
          value={formState.name}
          onChange={handleFormChange('name')}
        />
      </div>
    </div>
  )
}
