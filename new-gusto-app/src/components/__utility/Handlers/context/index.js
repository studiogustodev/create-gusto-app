import { createContext } from 'react'

const Context = createContext()

const {
  Consumer,
  Provider,
} = Context

export {
  Context as default,
  Consumer,
  Provider,
}
