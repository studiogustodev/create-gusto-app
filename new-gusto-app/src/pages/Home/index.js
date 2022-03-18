import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import SmoothScroll from '@/components/__utility/SmoothScroll'
import usePagePrecache from '@/hooks/usePagePrecache'
import style from './style'

const useStyles = createUseStyles(style)

const HomePage = () => {
  const classes = useStyles()
  const [isDataFetched, setDataFetched] = useState(false)

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { isPageAnimationReady } = useSelector((state) => ({
    isPageAnimationReady: state.loading.isPageAnimationReady,
    strings: state.options.strings,
  }), shallowEqual)

  /*------------------------------
  Did Mount
  ------------------------------*/
  useEffect(() => {
    setDataFetched(true)
  }, [])

  /*------------------------------
  Preload
  ------------------------------*/
  const [load] = usePagePrecache({
    init: isDataFetched,
    sources: [],
    callback: () => {},
  })

  /*------------------------------
  Render Content
  ------------------------------*/
  const renderContent = useCallback(() => {
    return load && (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum purus rhoncus, ullamcorper est vel, fermentum lectus. Fusce dictum sit amet massa ac dictum. Sed pharetra rutrum ex, non semper purus sollicitudin a. In vitae odio felis. Vivamus aliquam dictum ipsum, quis fermentum dui posuere ut. Aenean euismod aliquam posuere. Vivamus bibendum tellus non felis finibus finibus. Proin urna nisi, interdum nec enim quis, lacinia venenatis sem. Aenean ut risus vestibulum, placerat sem tristique, tempor elit.
        </div>
      </div>
    )
  }, [load, isPageAnimationReady])

  return (
    <SmoothScroll
      init={load}
      className={clsx({
        page: true,
        pageHome: true,
        [classes.root]: true,
      })}
    >
      {renderContent()}
    </SmoothScroll>
  )
}

export default memo(HomePage)
