import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import reducers from '@/reducers'

const reduxDevTools = global.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line

export const history = createBrowserHistory()

const reducersList = combineReducers({
  router: connectRouter(history),
  ...reducers,
})

const composeElements = [
  applyMiddleware(
    routerMiddleware(history),
    promise,
    thunk,
  ),
]

if (process.env.NODE_ENV !== 'production' && reduxDevTools) {
  composeElements.push(reduxDevTools())
}

export default () => createStore(reducersList, {}, compose(...composeElements))
