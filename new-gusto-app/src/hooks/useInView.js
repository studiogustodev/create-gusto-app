import { useEffect, useState, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollTrigger from '@/hooks/useScrollTrigger'

const useInView = ({
  start = 'top center',
  end = 'bottom center',
  once = true,
  trigger = null,
}) => {
  const { triggerReady } = useScrollTrigger()
  const [isInView, setInView] = useState(false)
  const triggerInstance = useRef([])

  useEffect(() => {
    if (triggerReady) {
      triggerInstance.current.push(ScrollTrigger.create({
        trigger,
        start,
        end,
        once,
        onEnter: () => setInView(true),
        onEnterBack: () => setInView(true),
        onLeave: () => setInView(false),
      }))
    }
    return () => {
      if (triggerReady) triggerInstance.current.map((tr) => tr.kill())
    }
  }, [triggerReady])

  return { isInView }
}

export default useInView
