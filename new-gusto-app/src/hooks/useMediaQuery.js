import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'react-jss'

const useMediaQuery = (size) => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false

  const theme = useTheme()

  const mediaQuery = window.matchMedia(theme.media[size].replace('@media ', ''))
  const [match, setMatch] = useState(!!mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches)
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  const [MatchQuery, SetMatchQuery] = useState(() => () => <></>)
  const [NotMatchQuery, SetNotMatchQuery] = useState(() => () => <></>)

  useEffect(() => {
    const MatchQueryComponent = () => ({ children }, props) => {
      return match && (
        <Fragment {...props}>
          {children}
        </Fragment>
      )
    }
    SetMatchQuery(MatchQueryComponent)
    const NotMatchQueryComponent = () => ({ children }, props) => {
      return !match && (
        <Fragment {...props}>
          {children}
        </Fragment>
      )
    }
    SetNotMatchQuery(NotMatchQueryComponent)
  }, [match])

  return { MatchQuery, NotMatchQuery, match }
}

export default useMediaQuery
