import { useEffect } from 'react'
import { useContext } from 'use-context-selector'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Modernizr from '@/vendors/modernizr'
import { Context as ScrollbarContext } from '@/context/scrollbar'

gsap.registerPlugin(ScrollTrigger)

const useScrollTriggerProxy = () => {
  const { scroll, scrollbar } = useContext(ScrollbarContext)

  /*------------------------------
  Init ScrollTrigger with Locomotive Scroll
  ------------------------------*/
  useEffect(() => {
    if (scrollbar && !Modernizr.nativescroll) {
      scrollbar.on('scroll', () => {
        ScrollTrigger.update()
      })
      ScrollTrigger.scrollerProxy(scrollbar.el, {
        scrollTop(value) {
          return arguments.length ? scrollbar.scrollTo(value, 0, 0) : scroll.current.y
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: scrollbar.el.style.transform ? 'transform' : 'fixed',
      })
    }
  }, [scrollbar])

  return null
}

export default useScrollTriggerProxy
