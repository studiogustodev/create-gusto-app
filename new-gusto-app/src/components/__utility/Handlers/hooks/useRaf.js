import { useContext, useCallback, useRef, useEffect } from 'react'

import Context from '../context'

export default (fn, props = [], position) => {
  const { dispatch, saveRafHandler, removeRafHandler } = useContext(Context)
  const fnMemoized = useCallback(fn, props)
  const fnRef = useRef(fnMemoized)
  fnRef.current = fnMemoized

  useEffect(() => {
    const rafHandler = () => fnRef.current()
    dispatch(saveRafHandler(rafHandler, position))
    return () => dispatch(removeRafHandler(rafHandler))
  }, [])
}
