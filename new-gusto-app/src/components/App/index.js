import { Suspense, useEffect, useRef, useCallback } from 'react'
import { ThemeProvider } from 'react-jss'
import { useDispatch } from 'react-redux'
import UAParser from 'ua-parser-js'
import GeneralContext from '@/context'
import ScrollbarContext from '@/context/scrollbar'
import Handlers from '@/components/__utility/Handlers'
import Routes from '@/router'
import Layout from '@/components/Layout'
import useViewport from '@/hooks/useViewport'
import theme from '@/styles/style'
import * as userActions from '@/actions/user'
import credits from '@/utils/credits'

const App = () => {
  const { vw, vh, vwfixed, vhfixed } = useViewport()
  const parser = useRef(new UAParser())

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const setUABrowser = useCallback((data) => dispatch(userActions.setUABrowser(data)), [dispatch])
  const setUAOS = useCallback((data) => dispatch(userActions.setUAOS(data)), [dispatch])

  useEffect(() => {
    credits()
    setUABrowser(parser.current.getBrowser())
    setUAOS(parser.current.getOS())
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--vw', `${vw}px`)
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    document.documentElement.style.setProperty('--vw-fixed', `${vwfixed}px`)
    document.documentElement.style.setProperty('--vh-fixed', `${vhfixed}px`)
  }, [vw, vh, vwfixed, vhfixed])

  return (
    <ThemeProvider theme={theme}>
      <Handlers>
        <GeneralContext>
          <ScrollbarContext>
            <Layout>
              <Suspense fallback={<div />}>
                <Routes />
              </Suspense>
            </Layout>
          </ScrollbarContext>
        </GeneralContext>
      </Handlers>
    </ThemeProvider>
  )
}

export default App
