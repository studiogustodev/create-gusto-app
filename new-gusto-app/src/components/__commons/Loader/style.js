const style = (theme) => {
  const diameter = 40
  const output = {
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: theme.zindex.loader,
      background: theme.colors[2],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    hide: {
      pointerEvents: 'none',
    },
    loaderContainer: {},
    logo: {
      marginBottom: 30,
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
    spinnerContainer: {
      width: diameter,
      height: diameter,
      margin: '0 auto',
    },
    spinner: {
      width: diameter,
      height: diameter,
      transformOrigin: 'center',
      animation: '$rotate 2s linear infinite',
      transition: 'all 0.3s ease-in',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      '& .circle-background': {
        stroke: theme.getRgba(theme.colors[1], 0.18),
        strokeWidth: 4,
        fill: 'none',
      },
      '& .circle-path': {
        stroke: theme.colors[1],
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
  }
  return output
}

export default style
