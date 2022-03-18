const style = (theme) => {
  const output = {
    logo: {
      position: 'relative',
      zIndex: 1,
      textDecoration: 'none',
      userSelect: 'none',
      pointerEvents: 'auto',
      fontSize: 29,
      letterSpacing: '-0.016em',
      padding: [0, 0, 0, 32],

      '& span': {
        color: theme.colors[1],
      },
    },
    symbol: {
      position: 'absolute',
      zIndex: -1,
      top: 8,
      left: 0,
      width: 26,
      height: 26,
      borderRadius: 30,
      background: theme.colors[1],

      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 30,
        background: theme.colors[1],
        boxShadow: `0 0 0 2px ${theme.colors[1]}`,
        transform: 'scale(.8)',
        transition: 'transform .2s ease-out .6s',
      },
    },
  }

  return output
}
export default style
