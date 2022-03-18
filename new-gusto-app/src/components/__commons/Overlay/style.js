const style = (theme) => {
  const output = {
    root: {
      pointerEvents: 'none',
      backgroundColor: theme.getRgba(theme.colors[0], 0.5),
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100vw',
      height: 'var(--vh)',
      zIndex: theme.zindex.overlay,
    },
    visible: {
      pointerEvents: 'all',
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {
    root: {
      height: 'var(--vh-fixed)',
    },
  }

  return output
}
export default style
