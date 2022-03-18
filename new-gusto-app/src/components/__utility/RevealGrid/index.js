import { memo, useCallback, useRef, useEffect } from 'react'
import { oneOfType, array, object, number, string, bool } from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollTrigger from '@/hooks/useScrollTrigger'
import usePrevious from '@/hooks/usePrevious'
import style from './style'

gsap.registerPlugin(ScrollTrigger)

const useStyles = createUseStyles(style)

const RevealGrid = ({
  children,
  className,
  cols,
  reset,
  singleRow,
  spaceBetween,
  delay,
}) => {
  const classes = useStyles({ cols, spaceBetween, singleRow })
  const $root = useRef()
  const { triggerReady } = useScrollTrigger()
  const trigger = useRef()

  const scrollTrigger = useCallback((elements) => {
    trigger.current = ScrollTrigger.batch(elements, {
      onEnter: (el) => {
        gsap.to(el, {
          opacity: 1,
          stagger: 0.2,
        })
      },
    })
  }, [])

  useEffect(() => {
    if (triggerReady && $root.current) setTimeout(() => scrollTrigger($root.current.children), delay)
  }, [triggerReady])

  const prevChild = usePrevious(children)
  useEffect(() => {
    if (
      prevChild
      && children.length > prevChild.length
    ) {
      const currentDomChildren = Array.prototype.slice.call($root.current.children)
      const newChildren = currentDomChildren.slice(prevChild.length, children.length + 1)
      scrollTrigger(newChildren)
    }
  }, [children])

  useEffect(() => {
    if (reset) {
      trigger.current?.map((t) => t.kill())
      gsap.to($root.current.children, {
        opacity: 0,
        onComplete: scrollTrigger,
      })
    }
  }, [reset])

  return (
    <div
      ref={$root}
      className={clsx({
        [classes.root]: true,
        [classes.cols]: true,
        [classes.cols__2]: cols === 2,
        [classes.cols__3]: cols === 3,
        [classes.cols__4]: cols === 4,
        revealGrid__root: true,
        [className]: className,
      })}
    >
      {children}
    </div>
  )
}

RevealGrid.propTypes = {
  children: oneOfType([
    array,
    object,
  ]).isRequired,
  className: string,
  cols: number,
  reset: bool,
  singleRow: bool,
  spaceBetween: number,
  delay: number,
}

RevealGrid.defaultProps = {
  className: '',
  cols: 3,
  reset: false,
  singleRow: false,
  spaceBetween: 30,
  delay: 0,
}

export default memo(RevealGrid)
