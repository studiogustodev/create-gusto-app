import Modernizr from '@/vendors/modernizr'

const global = (theme) => {
  const output = {
    root: {},
    '@global': {
      body: {
        fontFamily: theme.fonts[0],
        fontSize: 16,
        lineHeight: 1.2,
        color: theme.colors[1],
        background: theme.colors[2],
        overflow: Modernizr.nativescroll ? 'auto' : 'hidden',
        '& a': {
          textDecoration: 'none',
          transition: 'color .3s ease-in-out',
        },
        '& button': {
          fontSize: 16,
          fontFamily: theme.fonts[0],
          padding: 0,
        },
        '& input': {
          fontSize: 16,
          fontFamily: theme.fonts[0],
          padding: 0,
        },
        '& h1, & h2, & h3, & h4': {
          fontWeight: 'normal',
          margin: 0,
          padding: 0,
        },
        '& .smooth-scroll': {
          overflowY: 'auto',
          minHeight: 'var(--vh)',
        },
        '& .scrollbar-block': {
          overflow: 'hidden',
        },
      },
      '::selection': {
        background: theme.colors[3],
        color: theme.colors[1],
      },
      '::-moz-selection': {
        background: theme.colors[3],
        color: theme.colors[1],
      },
    },

    /*------------------------------
      COOKIEBOT
      ------------------------------*/
    '#cookiebanner': {
      position: 'fixed',
      zIndex: '10',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: '0 auto',
      background: 'rgba(0, 0, 0, 0.3)',
      color: 'rgba(255, 255, 255, .8)',
      fontFamily: '"TWKEverett", sans-serif',
      fontSize: '14px',
      padding: '15px 15px 15px 20px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '30px 30px 0 0',
      '& .c-message': {
        marginBottom: '0',
      },
      '& .c-button': {
        fontFamily: '"TWKEverett", sans-serif',
        background: '#fff',
        color: '#232323',
        fontSize: '11px',
        borderRadius: '20px',
        padding: '12px 20px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        textDecoration: 'none',
        marginLeft: '20px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
    },
  }

  return output
}

export default global
