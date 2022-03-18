const style = (theme) => {
  const output = {
    root: {
      overflow: 'hidden',
      marginTop: 120,
      position: 'relative',
      paddingTop: 80,
      color: theme.colors[3],
      '&::before': {
        content: '""',
        top: 0,
        left: '-5%',
        width: '110%',
        height: 220,
        zIndex: 0,
        position: 'absolute',
        borderRadius: '50% 50% 0 0',
        background: theme.colors[6],
      },
      '& h4': {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 25,
      },
    },
    container: {
      extend: [theme.smallWrapper],
      background: theme.colors[6],
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    wrapper: {
      paddingTop: 50,
      paddingBottom: 50,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    footerLeft: {
      flexBasis: '30%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    footerText: {
      '& p': {
        fontSize: 14,
        fontWeight: 400,
        '& a': {
          color: theme.colors[3],
          extend: theme.effects.underlined(),
        },
      },
    },
    footerRight: {
      flexBasis: '30%',
    },
    social: {
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
    certification: {
      marginBottom: 25,
      display: 'flex',
      '& > *': {
        width: 60,
      },
    },
  }

  /*------------------------------
  MD
  ------------------------------*/
  output[theme.mq.md] = {}

  /*------------------------------
  SM
  ------------------------------*/
  output[theme.mq.sm] = {
    root: {
      paddingTop: 60,
      '&::before': {
        height: 70,
      },
    },
    wrapper: {
      flexDirection: 'column',
      textAlign: 'center',
      '& > *:not(:last-child)': {
        marginBottom: 20,
      },
    },
    footerText: {
      marginTop: 10,
    },
    certification: {
      '& > *': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  }

  return output
}

export default style
