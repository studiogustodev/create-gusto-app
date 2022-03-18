import { useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import gsap from 'gsap'
import ParallaxImg from '@/components/ParallaxImg'
import style from './style'

const useStyles = createUseStyles(style)

const RevealImage = ({
  className,
  image,
  label,
  visible,
  inview,
  delay,
  featured,
}) => {
  const classes = useStyles({ image, featured })
  const $root = useRef()
  const $image = useRef()

  useEffect(() => {
    if (visible || inview) {
      gsap.to($root.current, {
        opacity: 1,
        duration: 2,
        ease: 'power3.inOut',
        delay,
      })

      gsap.to($image.current.ref, {
        scale: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        delay,
      })
    }
  }, [visible, inview])

  return (
    <picture
      ref={$root}
      className={`${classes.root} ${className}`}
    >
      <span className={classes.image}>
        <ParallaxImg
          ref={$image}
          img={image}
          alt={label}
        />
      </span>
    </picture>
  )
}

/*------------------------------
Default Props
------------------------------*/
RevealImage.defaultProps = {
  className: '',
  image: '',
  label: '',
  visible: false,
  inview: false,
  delay: 0,
}

export default RevealImage
