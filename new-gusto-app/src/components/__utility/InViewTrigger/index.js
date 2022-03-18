import { memo, cloneElement, Children, useState, useRef, useEffect } from 'react'
import { useContext } from 'use-context-selector'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Context as ScrollbarContext } from '@/context/scrollbar'

gsap.registerPlugin(ScrollTrigger)

const InViewTrigger = ({
  children,
  offset,
  once,
  className,
  ...props
}) => {
  const $root = useRef()
  const trigger = useRef()
  const [inview, setInview] = useState(false)
  const { scrollElement } = useContext(ScrollbarContext)

  useEffect(() => {
    if (scrollElement) {
      trigger.current = ScrollTrigger.create({
        trigger: $root.current,
        scroller: scrollElement,
        start: `top ${offset}`,
        once,
        onEnter: () => once && setInview(true),
        onToggle: (e) => !once && setInview(e.isActive),
      })
    }
    return () => {
      if (scrollElement) trigger.current.kill()
    }
  }, [scrollElement])

  return (
    <div ref={$root} className={className} {...props}>
      {Children.map(children, (child) => {
        return cloneElement(child, { inview: typeof child.type === 'string' ? undefined : inview })
      })}
    </div>
  )
}

InViewTrigger.defaultProps = {
  offset: '85%',
  once: true,
}

export default memo(InViewTrigger)
