import { memo } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import style from './style'

const useStyles = createUseStyles(style)

const Spinner = ({
  className,
  visible,
  diameter,
}) => {
  const classes = useStyles({ diameter })
  return (
    <div
      className={clsx({
        [classes.spinner]: true,
        [className]: className,
        [classes.visible]: visible,
      })}
    >
      <div className={classes.spinnerContainer}>
        <svg
          viewBox="0 0 50 50"
          width="50"
          height="50"
        >
          <circle
            className="circle-background"
            cx="25"
            cy="25"
            r="20"
          />
          <circle
            className="circle-path"
            cx="25"
            cy="25"
            r="20"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

Spinner.defaultProps = {
  diameter: 30,
  visible: false,
}

export default memo(Spinner)
