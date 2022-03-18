import { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import FontFaceObserver from 'fontfaceobserver'
import * as loadingActions from '@/actions/loading'

const useFontPreload = ({
  fonts,
}) => {
  const fontsToPreload = useRef([])

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const setFontReady = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isFontReady', bool)), [dispatch])

  useEffect(() => {
    if (fonts.length > 0) {
      fonts
        .map((font) => {
          fontsToPreload.current.push(new FontFaceObserver(font))
          return null
        })
      Promise.all(fontsToPreload.current
        .map((f) => f.load()))
        .then(() => {
          setFontReady(true)
        })
    }
  }, [])
}

useFontPreload.defaultProps = {
  fonts: [],
}

export default useFontPreload
