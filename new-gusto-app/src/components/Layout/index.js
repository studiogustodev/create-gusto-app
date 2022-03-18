import { memo } from 'react'
import injectSheet from 'react-jss'
import { useSelector, shallowEqual } from 'react-redux'
import Loader from '@/components/__commons/Loader'
import Spinner from '@/components/__commons/Spinner'
import SVGSprite from '@/components/__utility/SVGSprite'
import useFontPreload from '@/hooks/useFontPreload'
import useScrollTriggerProxy from '@/hooks/useScrollTriggerProxy'
import useChangePathname from '@/hooks/useChangePathname'
import global from '@/styles/global'

const Layout = ({
  classes,
  children,
}) => {
  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { isLoading } = useSelector((state) => ({
    isLoading: state.loading.isLoading,
  }), shallowEqual)

  /*------------------------------
  Precache fonts
  ------------------------------*/
  useFontPreload({ fonts: ['SGMatter-Regular'] })

  /*------------------------------
  Init Scroll Trigger Proxy
  ------------------------------*/
  useScrollTriggerProxy()

  /*------------------------------
  Manage Change Pathname
  ------------------------------*/
  useChangePathname()

  return (
    <div className={`${classes.root} content-root`}>
      <div className="wrapper">
        {children}
      </div>
      <SVGSprite />
      <Spinner visible={isLoading} />
      <Loader />
    </div>
  )
}

export default injectSheet(global)(memo(Layout))
