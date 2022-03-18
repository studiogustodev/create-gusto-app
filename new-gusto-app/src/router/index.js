import getRoutes from '@/router/routes'
import AnimatedRoutes from '@/router/TransitionSwitch/AnimatedRoutes'
import RouteTransition from '@/router/TransitionSwitch/RouteTransition'

const Router = ({ routes }) => {
  return (
    <div className="route-container">
      <AnimatedRoutes
        exitBeforeEnter
        initial={false}
      >
        {getRoutes(routes)
          .map(({ key, path, exact, component, render }) => {
            return (
              <RouteTransition
                key={key}
                path={path}
                exact={exact}
                component={component}
                render={render}
              />
            )
          })}
      </AnimatedRoutes>
    </div>
  )
}

export default Router
