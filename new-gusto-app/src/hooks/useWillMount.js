import { useRef } from 'react'

export default (cb) => {
  const isMounted = useRef(false)
  if (!isMounted.current) {
    isMounted.current = true
    cb()
  }
}
