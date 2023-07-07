type InputProps = {
  label: string
  value: string
  type?: string
  onChange?: (value: string) => void
}

export const Input = ({
  label,
  value,
  type = 'text',
  onChange,
}: InputProps) => (
  <div className="flex space-x-5 items-center">
    <label htmlFor="name">{label}</label>
    <input
      type={type}
      className="rounded-sm p-2"
      id="name"
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  </div>
)
