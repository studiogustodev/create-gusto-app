import { useRef, useCallback } from 'react'

const useCollectionRef = () => {
  const innerRef = useRef([])
  const setInnerRef = useCallback((key = 0) => (selector) => {
    if (selector) {
      innerRef.current[key] = selector
    }
  }, [])

  return [innerRef, setInnerRef]
}

export default useCollectionRef
