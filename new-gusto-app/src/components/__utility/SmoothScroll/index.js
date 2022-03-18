import { memo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useContext } from 'use-context-selector'
import clsx from 'clsx'
import ResizeObserver from 'resize-observer-polyfill'
import LocomotiveScroll from 'locomotive-scroll'
import Modernizr from '@/vendors/modernizr'
import { Context as ScrollbarContext } from '@/context/scrollbar'

const SmoothScroll = forwardRef(({
  children,
  className,
  direction,
  init,
  lerp,
  smooth,
}, ref) => {
  const $root = useRef(null)
  const scrollRef = useRef()
  const observerRef = useRef()
  const { setScrollbar } = useContext(ScrollbarContext)

  /*------------------------------
  Resize observer to solve page height issue
  ------------------------------*/
  useEffect(() => {
    if ($root.current) {
      observerRef.current = new ResizeObserver(() => {
        if ($root.current) scrollRef.current?.update()
      })
      observerRef.current.observe($root.current)
    }
    return () => {
      if ($root.current) observerRef.current.disconnect($root.current)
    }
  }, [$root])

  /*------------------------------
  Initialize LocomotiveScroll
  ------------------------------*/
  useEffect(() => {
    if (
      $root.current
      && init
      && !Modernizr.nativescroll
    ) {
      scrollRef.current = new LocomotiveScroll({
        el: $root.current,
        direction,
        smooth,
        tablet: {
          breakpoint: 0,
          smooth: true,
        },
        lerp,
        getDirection: true,
        getSpeed: true,
        repeat: false,
        touchMultiplier: 2,
      })
      setScrollbar(scrollRef.current)
    }
    if (
      $root.current
      && init
      && Modernizr.nativescroll
    ) setScrollbar({ el: $root.current })
    return () => {
      if (
        init
        && scrollRef.current
      ) scrollRef.current.destroy()
    }
  }, [$root, init])

  /*------------------------------
  Expose Locomotive Method Outside
  ------------------------------*/
  useImperativeHandle(ref, () => ({
    ref: $root.current,
  }))

  return (
    <div
      className={clsx({
        [className]: className,
        'smooth-scroll': true,
      })}
      ref={$root}
      data-scroll-container
    >
      {children}
    </div>
  )
})

SmoothScroll.defaultProps = {
  smooth: true,
  lerp: 0.1,
  direction: 'vertical',
}

export default memo(SmoothScroll)
