import { useCallback, useRef, useContext, useEffect } from 'react'
import Context from '../context'

export default (fn, props = [], position) => {
  const { dispatch, saveResizeHandler, removeResizeHandler } = useContext(Context)
  const fnMemoized = useCallback(fn, props)
  const fnRef = useRef(fnMemoized)
  fnRef.current = fnMemoized

  useEffect(() => {
    const resizeHandler = () => fnRef.current()
    resizeHandler()
    dispatch(saveResizeHandler(resizeHandler, position))
    return () => dispatch(removeResizeHandler(resizeHandler))
  }, [])
}
