import { useCallback, useState, useEffect } from 'react'

const useViewport = () => {
  const [vw, setVW] = useState(0)
  const [vwfixed, setVWfixed] = useState(0)
  const [vh, setVH] = useState(0)
  const [vhfixed, setVHfixed] = useState(0)

  const setSizes = useCallback(() => {
    if (window.innerWidth !== vw) setVW(window.innerWidth)
    if (window.innerHeight !== vh) setVH(window.innerHeight)
  }, [vw, vh, vwfixed, vhfixed])

  useEffect(() => {
    setSizes()
    setVWfixed(window.innerWidth)
    setVHfixed(window.innerHeight)

    window.addEventListener('resize', setSizes)
    return () => window.removeEventListener('resize', setSizes)
  }, [])

  return { vw, vh, vwfixed, vhfixed }
}

export default useViewport
