import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'

const RevealFadeIn = ({
  className,
  children,
  enterDuration,
  exitDuration,
  ease,
  enterDelay,
  exitDelay,
  visible,
  inview,
  tag,
}) => {
  const $root = useRef()
  const Tag = tag

  /*------------------------------
  Init
  ------------------------------*/
  useEffect(() => {
    gsap.set($root.current, {
      opacity: 0,
    })
  }, [])

  /*------------------------------
  Visible
  ------------------------------*/
  useEffect(() => {
    gsap.killTweensOf($root.current)
    gsap.to($root.current, {
      opacity: (visible || inview) ? 1 : 0,
      duration: (visible || inview) ? enterDuration : exitDuration,
      ease,
      delay: (visible || inview) ? enterDelay : exitDelay,
    })
  }, [visible, inview])

  return (
    <Tag
      ref={$root}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </Tag>
  )
}

/*------------------------------
Default Props
------------------------------*/
RevealFadeIn.defaultProps = {
  className: '',
  tag: 'div',
  enterDuration: 1.4,
  exitDuration: 1.4,
  enterDelay: 0,
  exitDelay: 0,
  ease: 'power3.inOut',
  visible: false,
  inview: false,
}

export default memo(RevealFadeIn)
