const style = (theme) => {
  const output = {
    root: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    title: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      fontSize: '300px',
      margin: '0',
      color: theme.colors[1],
      fontFamily: theme.fonts[1],
      userSelect: 'none',
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {}

  return output
}

export default style
