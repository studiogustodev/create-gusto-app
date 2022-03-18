const style = (theme) => {
  const output = {
    spinnerContainer: {
      width: (props) => props.diameter,
      height: (props) => props.diameter,
      margin: '0 auto',
    },
    spinner: {
      width: (props) => props.diameter,
      height: (props) => props.diameter,
      transformOrigin: 'center',
      animation: '$rotate 2s linear infinite',
      transition: 'all 0.3s ease-in',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      opacity: 0,
      '& svg': {
        width: '100%',
        height: '100%',
      },
      '& .circle-background': {
        stroke: theme.getRgba(theme.colors[3], 0.18),
        strokeWidth: 4,
        fill: 'none',
      },
      '& .circle-path': {
        stroke: theme.colors[3],
        strokeWidth: 4,
        fill: 'none',
        animation: '$dash 2.5s ease-in-out infinite',
      },
    },
    '@keyframes rotate': {
      from: { transform: 'rotate(0)' },
      to: { transform: 'rotate(360deg)' },
    },
    '@keyframes dash': {
      '0%': {
        strokeDasharray: '1, 150',
        strokeDashoffset: 0,
      },
      '50%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: -35,
      },
      '100%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: -124,
      },
    },
    visible: {
      opacity: 1,
    },
  }

  output[theme.mq.sm] = {}

  return output
}

export default style
