import { useEffect, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useContext } from 'use-context-selector'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Context as ScrollbarContext } from '@/context/scrollbar'

const useScrollTrigger = (
  start = 'top 85%',
  end = 'bottom top',
  once = true,
) => {
  const { scrollElement } = useContext(ScrollbarContext)
  const [triggerReady, setTriggerReady] = useState(false)

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { isPageAnimationReady } = useSelector((state) => ({
    isPageAnimationReady: state.loading.isPageAnimationReady,
  }), shallowEqual)

  useEffect(() => {
    if (isPageAnimationReady && scrollElement) {
      ScrollTrigger.defaults({
        scroller: scrollElement,
        start,
        end,
        once,
      })
      setTriggerReady(true)
    }
  }, [isPageAnimationReady, scrollElement])

  return { triggerReady }
}

export default useScrollTrigger
