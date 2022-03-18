import { useState, useEffect } from 'react'
import Modernizr from '@/vendors/modernizr'

const useHover = ({ ref }) => {
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e) => {
    if (Modernizr.devicehastouch) return
    if (e.type === 'mouseenter') setHover(true)
    if (e.type === 'mouseleave') setHover(false)
  }

  useEffect(() => {
    ref?.current?.addEventListener('mouseenter', handleMouseMove)
    ref?.current?.addEventListener('mouseleave', handleMouseMove)
    return () => {
      ref?.current?.removeEventListener('mouseenter', handleMouseMove)
      ref?.current?.removeEventListener('mouseleave', handleMouseMove)
    }
  }, [ref])

  return [hover, setHover]
}

export default useHover
