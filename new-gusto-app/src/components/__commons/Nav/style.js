const style = (theme) => {
  const output = {
    root: {
      position: 'fixed',
      top: '2.5vh',
      right: '4vw',
      paddingTop: '10vh',
      paddingBottom: '10vh',
      paddingLeft: '8vw',
      paddingRight: '8vw',
      width: '65vw',
      height: '95vh',
      background: theme.colors[1],
      zIndex: theme.zindex.mainNav,
      overflow: 'auto',
      borderRadius: 50,
    },
    container: {
      height: '100%',
    },
    wrapper: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
      alignContent: 'space-between',
      '& > *': {
        flexBasis: '50%',
      },
    },
    nav: {
      fontWeight: 300,
      fontSize: '4.3vw',
      '& li': {
        lineHeight: 1,
        '&:not(:last-child)': {
          marginBottom: 15,
        },
      },
      '& span': {
        position: 'relative',
        fontFamily: theme.fonts[1],
        color: theme.colors[3],
        lineHeight: 1,
        textTransform: 'uppercase',
        cursor: 'default',
        userSelect: 'none',
      },
      '& a': {
        position: 'relative',
        fontFamily: theme.fonts[1],
        color: theme.colors[3],
        lineHeight: 1,
        textTransform: 'uppercase',
        userSelect: 'none',
        '&:after': {
          content: '""',
          bottom: 0,
          display: 'block',
          height: 2,
          left: 0,
          position: 'absolute',
          background: 'currentColor',
          transition: 'width 0.4s ease 0s',
          width: 0,
        },
        '@media (hover: hover)': {
          '&:hover': {
            '&:after': {
              width: '100%',
            },
          },
        },
      },
    },
    mainNav: {
      fontSize: '4.3vw',
    },
    extraNav: {
      fontSize: 30,
      '& a': {
        '&:after': {
          height: 1,
        },
      },
      '& li': {
        '&:not(:last-child)': {
          marginBottom: 15,
        },
      },
    },
    childNav: {
      marginTop: 25,
      fontSize: 18,
      '& a': {
        fontFamily: theme.fonts[0],
        textTransform: 'none',
        color: theme.colors[4],
        fontWeight: 500,
        '&:after': {
          height: 1,
        },
      },
      '& li': {
        marginBottom: 15,
      },
    },
    active: {
      pointerEvents: 'none',
      cursor: 'default',
      '&:after': {
        width: '100% !important',
      },
    },
    visible: {
      opacity: 1,
    },
    info: {
      fontSize: 14,
      color: theme.colors[4],
      '& > *:not(:last-child)': {
        marginBottom: 20,
      },
      '& a': {
        color: theme.colors[4],
        extend: theme.effects.underlined(),
      },
    },
    social: {
      '& a': {
        '&::before': {
          content: 'none',
        },
      },
      '& > *': {
        '& svg': {
          width: 25,
          height: 25,
          fill: theme.colors[4],
          transition: `all 0.3s ${theme.easings['power4.out']}`,
        },
        '&:hover': {
          '& svg': {
            fill: theme.colors[3],
          },
        },
      },
    },
  }

  /*------------------------------
  MD
  ------------------------------*/
  output[theme.mq.md] = {
    root: {
      width: '85vw',
      height: '85vh',
    },
    mainNav: {
      fontSize: 50,
    },
  }

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {
    root: {
      width: '100vw',
      height: 'var(--vh-fixed)',
      top: 0,
      right: 0,
      borderRadius: 0,
      paddingTop: '15vh',
    },
    container: {
      height: 'auto',
    },
    wrapper: {
      '& > *': {
        flexBasis: '100%',
      },
    },
    nav: {
      '& li': {
        textAlign: 'center',
        '&:not(:last-child)': {
          marginBottom: 0,
        },
      },
      '& span': {
        fontSize: 80,
        cursor: 'pointer',
      },
    },
    mainNav: {
      fontSize: 80,
    },
    extraNav: {
      fontSize: 40,
      marginTop: 40,
      '& li': {
        '&:not(:last-child)': {
          marginBottom: 10,
        },
      },
    },
    info: {
      marginTop: 40,
      textAlign: 'center',
    },
    childNav: {
      '& li': {
        marginBottom: '15px !important',
      },
    },
  }

  return output
}

export default style
