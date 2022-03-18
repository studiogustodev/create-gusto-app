const style = (theme) => {
  const output = {
    root: {
      color: theme.colors[1],
      padding: [20, 20, 0, 20],
      position: 'relative',
      zIndex: 1,
    },
    wrapper: {
      extend: theme.smallWrapper,
    },
    content: {
      marginTop: 100,
      position: 'relative',
      zIndex: 1,
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {}

  return output
}

export default style
