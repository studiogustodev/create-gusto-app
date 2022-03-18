const style = (theme) => {
  const output = {
    root: {
      willChange: 'opacity',
      overflow: 'hidden',
      display: 'block',
      opacity: 0,
      '& span': {
        display: 'block',
        willChange: 'transform',
        paddingBottom: (props) => (props.featured ? '70%' : `${(props.image.height / props.image.width) * 100}%`),
      },
    },
    image: {
      position: 'relative',
      zIndex: 1,
      '& img': {
        willChange: 'transform',
        transform: 'scale(1.2)',
      },
    },
  }

  output[theme.mq.sm] = {
  }

  return output
}

export default style
