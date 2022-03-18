const style = (theme) => {
  const output = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        opacity: 0,
      },
    },
    cols: {
      flexWrap: 'no-wrap',
      marginLeft: (props) => `-${props.spaceBetween}px`,
      '& > *': {
        width: (props) => `calc(100% / ${props.cols})`,
        flexBasis: (props) => `calc(100% / ${props.cols})`,
        paddingLeft: (props) => `${props.spaceBetween}px`,
      },
    },
    cols__2: {
      '& > *': {
        '&:nth-child(n+3)': {
          marginTop: (props) => props.spaceBetween,
        },
      },
    },
    cols__3: {
      '& > *': {
        '&:nth-child(n+4)': {
          marginTop: (props) => props.spaceBetween,
        },
      },
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {
    root: {
      flexDirection: 'column',
      '& > *:not(:last-child)': {
        // marginBottom: 25,
      },
    },
    cols: {
      marginLeft: 0,
      marginRight: 0,
      '& > *': {
        width: '100% !important',
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
        '&:not(:first-child)': {
          marginTop: (props) => `${props.spaceBetween}px`,
        },
      },
    },
  }

  return output
}

export default style
