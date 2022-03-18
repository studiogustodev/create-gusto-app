import { Consumer } from './context'

const withHandlers = (WrappedComponent) => {
  const WithHandlers = (props) => (
    <Consumer>
      {(state) => (
        <WrappedComponent
          {...props} // eslint-disable-line react/jsx-props-no-spreading
          saveRafHandler={(data) => state.dispatch(state.saveRafHandler(data))}
          removeRafHandler={(data) => state.dispatch(state.removeRafHandler(data))}
        />
      )}
    </Consumer>
  )

  return WithHandlers
}

export default withHandlers
