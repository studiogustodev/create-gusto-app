import { useRef, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import Modernizr from '@/vendors/modernizr'
import usePrevious from '@/hooks/usePrevious'

const Context = createContext()
const {
  Provider,
  Consumer,
} = Context

const ScrollbarContext = ({ children }) => {
  const [scrollbar, setScrollbar] = useState(null)
  const [isScrollBlock, setScrollBlock] = useState(false)
  const scroll = useRef({})
  const delta = useRef({})
  const limit = useRef(0)
  const [scrollElement, setScrollElement] = useState(null)
  const direction = useRef(null)
  const speed = useRef(0)

  /*------------------------------
  Init and Change Page
  ------------------------------*/
  useEffect(() => {
    if (scrollbar) {
      // Init new scrollbar on change page
      if (Modernizr.nativescroll) {
        scrollbar.el.addEventListener('scroll', () => {
          const $el = scrollbar.el

          scroll.current = { x: $el.scrollLeft, y: $el.scrollTop }
          limit.current = { x: $el.clientWidth, y: $el.scrollHeight - $el.clientHeight }
        })
        scrollbar.scrollTo = (y) => scrollbar.el.scrollTo({ top: y, left: 0, behavior: 'smooth' })
        scrollbar.stop = () => scrollbar.el.classList.add('scrollbar-block')
        scrollbar.start = () => scrollbar.el.classList.remove('scrollbar-block')
      } else {
        scrollbar.on('scroll', (e) => {
          scroll.current = e.scroll
          delta.current = e.delta
          limit.current = e.limit
          speed.current = e.speed
          direction.current = e.direction
        })
      }
      setScrollElement(scrollbar.el)
    }
  }, [scrollbar])

  const prevScrollbar = usePrevious(scrollbar)
  useEffect(() => {
    if (
      prevScrollbar !== undefined
      && prevScrollbar?.el !== scrollbar?.el
    ) {
      scroll.current.y = 0
      if (!Modernizr.nativescroll) scrollbar.update()
    }
  }, [scrollbar])

  return (
    <Provider value={{
      scrollbar,
      setScrollbar,
      speed,
      scroll,
      delta,
      limit,
      direction,
      isScrollBlock,
      setScrollBlock,
      scrollElement,
    }}
    >
      { children }
    </Provider>
  )
}

export {
  Context,
  Consumer,
}

export default ScrollbarContext
