import { useState } from 'react'
import { createContext } from 'use-context-selector'

const Context = createContext()
const { Provider, Consumer } = Context

const ContextComponent = ({
  children,
}) => {
  const [berlinVideo, setBerlinVideo] = useState()

  return (
    <Provider value={{
      berlinVideo,
      setBerlinVideo,
    }}
    >
      {children}
    </Provider>
  )
}

export {
  Context,
  Consumer,
}

export default ContextComponent
