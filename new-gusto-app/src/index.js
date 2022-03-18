/* Accessibility */
import 'focus-visible'

import ReactDOM from 'react-dom'
import { JssProvider } from 'react-jss'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import createStore, { history } from '@/base/store'
import '@/detects/modernizr'
import '@/tracking'
import AppComponent from '@/components/App'
// import registerServiceWorker from '@/pwa/serviceWorker'

const store = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <JssProvider id={{ minify: process.env.NODE_ENV === 'production' }}>
          <AppComponent />
        </JssProvider>
      </ConnectedRouter>
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

/* Register Service Worker */
// registerServiceWorker()
