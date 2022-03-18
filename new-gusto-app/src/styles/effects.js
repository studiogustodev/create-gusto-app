import easings from '@/styles/easings'

const underlined = (reverse = false) => ({
  position: 'relative',
  zIndex: 1,
  display: 'inline-block',
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 1,
    width: '100%',
    height: 1,
    backgroundColor: 'currentColor',
    transition: `transform .6s ${easings['power3.out']}`,
    transform: reverse ? 'scaleX(0)' : 'scaleX(1)',
    transformOrigin: '100% 0',
  },
  '@media (hover: hover)': {
    '&:hover': {
      '&:before': {
        transform: reverse ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: '0 0',
      },
    },
  },
})

export default {
  underlined,
}
