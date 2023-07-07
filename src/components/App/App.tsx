import './App.css'
import { FC } from '../../utils/types/FC'

type AppProps = FC<{
  title: string
}>

export const App = ({ title, children }: AppProps) => (
  <div className="flex flex-col space-y-10 w-1/2 mx-auto items-center">
    <h1 className="text-3xl font-bold underline">{title}</h1>
    {children}
  </div>
)
