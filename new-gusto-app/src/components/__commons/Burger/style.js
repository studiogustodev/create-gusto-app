const style = (theme) => {
  const burgerBorderHeight = 2
  const output = {
    root: {
      width: (props) => props.width,
      height: (props) => props.height,
      cursor: 'pointer',
      display: 'flex',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: 60,
        height: 60,
        top: 'calc(50% - 30px)',
        left: 'calc(50% - 30px)',
        backgroundColor: theme.colors[4],
        borderRadius: '50%',
        opacity: 0,
        transition: `all 0.2s ${theme.easings['power4.out']}`,
      },
    },
    box: {
      position: 'relative',
      display: 'inline-block',
      width: (props) => props.width,
      height: (props) => props.height,
    },
    inner: {
      position: 'absolute',
      width: (props) => props.width,
      height: (props) => props.height,
      backgroundColor: 'trasparent',
      '& span': {
        display: 'inline-block',
        position: 'absolute',
        width: '100%',
        height: burgerBorderHeight,
        backgroundColor: 'currentColor',
        right: 0,
        top: 0,
        '&:nth-child(2)': {
          top: 'auto',
          bottom: 0,
          transformOrigin: 'right top',
          transform: 'scaleX(0.6)',
        },
      },
    },
    isActive: {
      '& $inner': {
        '& span': {
          top: `calc(50% - ${burgerBorderHeight / 2}px)`,
          '&:nth-child(2)': {
            transformOrigin: 'center',
            top: `calc(50% - ${burgerBorderHeight / 2}px)`,
            bottom: 'auto',
          },
        },
      },
      '&::before': {
        opacity: 1,
      },
    },
    isHover: {
      '@media (hover: hover)': {
        '&:not($isActive)': {
          '& $inner': {
            '& span': {
              '&:nth-child(2)': {
                transformOrigin: 'right',
                transform: 'scaleX(1)',
              },
            },
          },
        },
      },
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {}

  return output
}

export default style
