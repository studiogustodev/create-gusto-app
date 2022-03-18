import { memo, forwardRef } from 'react'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import DelayLink from '@/components/__commons/DelayLink'
import { CURRENT_LANG } from '@/constants'
import style from './style'

const useStyles = createUseStyles(style)

const Logo = forwardRef(({
  className,
}, ref) => {
  const classes = useStyles()

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [className]: className,
      })}
      ref={ref}
    >
      <DelayLink
        to={CURRENT_LANG}
        className={classes.logo}
        title="Home"
      >
        <div className={`${classes.symbol} logo__symbol`} />
        <span className={classes.letter} style={{ '--delay': 0 }}>s</span>
        <span className={classes.letter} style={{ '--delay': 1 }}>t</span>
        <span className={classes.letter} style={{ '--delay': 2 }}>u</span>
        <span className={classes.letter} style={{ '--delay': 3 }}>d</span>
        <span className={classes.letter} style={{ '--delay': 4 }}>i</span>
        <span className={classes.letter} style={{ '--delay': 5 }}>o</span>
        <span className={classes.letter} style={{ '--delay': 6 }}>g</span>
        <span className={classes.letter} style={{ '--delay': 7 }}>u</span>
        <span className={classes.letter} style={{ '--delay': 8 }}>s</span>
        <span className={classes.letter} style={{ '--delay': 9 }}>t</span>
        <span className={classes.letter} style={{ '--delay': 10 }}>o</span>
      </DelayLink>
    </div>
  )
})

export default memo(Logo)
