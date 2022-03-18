import { memo, useCallback, useEffect, useRef } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import injectSheet from 'react-jss'
import clsx from 'clsx'
import gsap from 'gsap'
import Logo from '@/components/__commons/Logo'
import * as loadingActions from '@/actions/loading'
import style from './style'

const Loader = ({ classes }) => {
  const $root = useRef()
  const $logo = useRef()
  const $spinner = useRef()

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { isSiteLoaded, isLoaderExited } = useSelector((state) => ({
    isSiteLoaded: state.loading.isSiteLoaded,
    isLoaderExited: state.loading.isLoaderExited,
  }), shallowEqual)

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const setLoaderExited = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isLoaderExited', bool)), [dispatch])

  /*------------------------------
  On Complete Animation
  ------------------------------*/
  const onCompleteLoaderEnd = useCallback(() => setLoaderExited(true), [])

  /*------------------------------
  Loader End Animation
  ------------------------------*/
  const animateLoaderEnd = useCallback(() => {
    const timeline = gsap.timeline({ onComplete: onCompleteLoaderEnd })
    timeline
      .to([$logo.current, $spinner.current], ({
        autoAlpha: 0,
      }), 1.2)
      .to($root.current, ({
        autoAlpha: 0,
      }), 2)
  }, [])

  /*------------------------------
  Animate Loader End
  ------------------------------*/
  useEffect(() => {
    if (isSiteLoaded) animateLoaderEnd()
  }, [isSiteLoaded])

  /*------------------------------
  Render
  ------------------------------*/
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.hide]: isLoaderExited,
      })}
      ref={$root}
    >
      <div className={classes.loaderContainer}>
        <Logo
          ref={$logo}
          className={classes.logo}
        />
        <div className={classes.spinnerContainer}>
          <svg
            ref={$spinner}
            className={classes.spinner}
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
    </div>
  )
}

export default injectSheet(style)(memo(Loader))
