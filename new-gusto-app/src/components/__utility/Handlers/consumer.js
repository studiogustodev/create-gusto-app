import { Consumer } from './context'

const ConsumerComponent = ({ children }) => (
  <Consumer>
    {(state) => (typeof children === 'function' ? children(state) : children)}
  </Consumer>
)

export default ConsumerComponent
