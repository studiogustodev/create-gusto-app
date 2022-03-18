import gsap from 'gsap'

const DEFAULT_EASING = 'power4.out'

export default {
  show: ({ $image, $container, delay }) => {
    gsap.killTweensOf([$image, $container])
    gsap.timeline({ delay })
      .to($container, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        '-webkit-clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: DEFAULT_EASING,
        duration: 1,
      })
      .fromTo($image, {
        opacity: 0,
        scale: 1.5,
      },
      {
        opacity: 1,
        scale: 1,
        ease: DEFAULT_EASING,
        duration: 1,
      }, '<')
  },
  hide: ({ $image, $container }) => {
    gsap.killTweensOf([$image, $container])
    gsap.timeline()
      .to($image, {
        opacity: 0,
        scale: 1.5,
        ease: DEFAULT_EASING,
        duration: 0.5,
      })
      .to($container, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        '-webkit-clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        ease: 'power4.out',
        duration: 0.5,
      }, '<')
  },
}
