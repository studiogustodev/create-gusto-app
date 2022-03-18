import { memo, useRef, useEffect } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { createUseStyles } from 'react-jss'
import style from './style'

const useStyles = createUseStyles(style)

const Burger = ({
  height,
  isActive,
  isHover,
  width,
  className,
}) => {
  const classes = useStyles({ width, height })
  const $firstLine = useRef()
  const $secondLine = useRef()
  const timeline = useRef()

  useEffect(() => {
    gsap.killTweensOf([$firstLine.current, $secondLine.current])
    timeline.current = gsap.timeline()
    timeline.current
      .to($firstLine.current, {
        rotate: isActive ? '-45deg' : 0,
        duration: 0.75,
        ease: isActive ? 'elastic.out(1, 0.75)' : 'power4.out',
      })
      .to($secondLine.current, {
        rotate: isActive ? '45deg' : 0,
        scaleX: isActive ? 1 : 0.6,
        duration: 0.75,
        ease: isActive ? 'elastic.out(1, 0.75)' : 'power4.out',
      }, '<')
  }, [isActive])

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.isActive]: isActive,
        [classes.isHover]: isHover,
        [className]: className,
      })}
    >
      <div className={classes.box}>
        <div className={`${classes.inner} inner`}>
          <span ref={$firstLine} />
          <span ref={$secondLine} />
        </div>
      </div>
    </div>
  )
}

Burger.defaultProps = {
  height: 10,
  width: 21,
}

export default memo(Burger)
