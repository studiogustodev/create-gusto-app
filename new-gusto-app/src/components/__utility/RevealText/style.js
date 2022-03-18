const style = (theme) => {
  const output = {
    root: {
      position: 'relative',
      opacity: 0,
      '& p': {
        marginBottom: 0,
      },
      '& *': {
        lineHeight: (props) => props.lineHeight,
        // whiteSpace: 'pre',
        display: 'block',
        position: 'relative',
        flex: 'none',
      },
    },
    oneLine: {
      '& *': {
        whiteSpace: 'pre',
      },
    },
    wrap: {
      overflow: 'hidden',
      '& div.line:not(:last-child)': {
        marginBottom: (props) => `${props.linesMargin}em`,
        overflow: 'hidden',
        '& div': {
          overflow: 'hidden',
        },
      },
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {
  }

  return output
}

export default style
