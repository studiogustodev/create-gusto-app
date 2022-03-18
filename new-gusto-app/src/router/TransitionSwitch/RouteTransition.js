import { Route } from 'react-router-dom'
import MountTransition from './MountTransition'

const RouteTransition = ({
  render,
  exact = false,
  path,
  transition,
  location,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      location={location}
    >
      <MountTransition
        slide={transition === 'slide'}
        slideUp={transition === 'slideUp' ? 100 : 0}
      >
        {render()}
      </MountTransition>
    </Route>
  )
}

export default RouteTransition
