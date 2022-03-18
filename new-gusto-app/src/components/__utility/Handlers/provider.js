import { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './context'
import { reducer, actions } from './state'

class Handlers extends Component {
  state = ({ ...reducer(), // eslint-disable-line react/state-in-constructor
    ...actions,
    dispatch: (action) => { // eslint-disable-line react/no-unused-state
      this.setState((state) => {
        const newState = reducer(state, action)
        return newState
      })
    } })

  UNSAFE_componentWillMount() {
    const { unmountTicker } = this.props
    if (unmountTicker) {
      unmountTicker(this.onRaf)
    } else {
      cancelAnimationFrame(this.rafId)
    }
    window.removeEventListener('resize', this.onResize, false)
  }

  componentDidMount() {
    const { mountTicker } = this.props
    if (mountTicker) {
      mountTicker(this.onRaf)
    } else {
      this.rafId = requestAnimationFrame(this.onRaf)
    }
    window.addEventListener('resize', this.onResize, false)
  }

  onResize = () => {
    const { resize } = this.state
    const { debounce } = this.props
    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      const width = window.innerWidth
      const height = window.innerHeight
      resize.forEach((h) => h(width, height))
    }, debounce)
  }

  onRaf = (event) => {
    const { raf } = this.state
    raf.forEach((h) => h(event))
    const { mountTicker } = this.props
    if (!mountTicker) {
      this.rafId = requestAnimationFrame(this.onRaf)
    }
  }

  resizeTimeout = undefined

  rafId = undefined

  render() {
    const { children } = this.props
    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    )
  }
}

Handlers.defaultProps = {
  debounce: 300,
  mountTicker: undefined,
  unmountTicker: undefined,
}

Handlers.propTypes = {
  debounce: PropTypes.number,
  mountTicker: PropTypes.func,
  unmountTicker: PropTypes.func,
}

export default Handlers
