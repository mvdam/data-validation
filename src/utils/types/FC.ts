// like React.FC but now with children sinces those were removed since React v18
export type FC<T = {}> = T & {
  children: React.ReactNode
}
