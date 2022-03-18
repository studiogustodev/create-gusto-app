import { memo } from 'react'
import injectSheet from 'react-jss'
import usePagePrecache from '@/hooks/usePagePrecache'
import style from './style'

const NotFound = ({ classes }) => {
  /*------------------------------
  Preload
  ------------------------------*/
  const [load] = usePagePrecache({
    init: true,
    sources: [],
    callback: () => {},
  })

  return load && (
    <div className={`page page404 ${classes.root}`}>
      <h2 className={classes.title}>404</h2>
    </div>
  )
}

export default injectSheet(style)(memo(NotFound))
