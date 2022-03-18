import { useCallback, useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { precacheMedia } from '@/utils/media'
import { removeUndefined } from '@/utils/array'
import * as loadingActions from '@/actions/loading'

const usePagePrecache = ({
  init = false,
  sources = [],
  callback = () => {},
}) => {
  const [trigger, setTrigger] = useState(false)
  const [load, setLoad] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(false)

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { isFontReady, isLoaderExited } = useSelector((state) => ({
    isFontReady: state.loading.isFontReady,
    isLoaderExited: state.loading.isLoaderExited,
  }), shallowEqual)

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const setReady = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isReady', bool)), [dispatch])
  const setSiteLoaded = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isSiteLoaded', bool)), [dispatch])
  const setPageAnimationReady = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isPageAnimationReady', bool)), [dispatch])

  /*------------------------------
  Complete preload
  ------------------------------*/
  const completePreload = () => {
    setReady(true)
    setSiteLoaded(true)
    setTrigger(true)
  }

  /*------------------------------
  Start the media precache
  ------------------------------*/
  useEffect(() => {
    if (init && removeUndefined(sources).length > 0) {
      precacheMedia(
        removeUndefined(sources), // source list
        completePreload, // callback
      )
    }
    if (init && removeUndefined(sources).length === 0) completePreload()
  }, [init])

  /*------------------------------
  Check if Fonts & Audio are ready
  ------------------------------*/
  useEffect(() => {
    if (trigger && isFontReady) setLoad(true)
  }, [trigger, isFontReady])

  /*------------------------------
  Check if load is true and loader is exited
  ------------------------------*/
  useEffect(() => {
    if (load && isLoaderExited) {
      setAnimationTrigger(true)
      setPageAnimationReady(true)
      callback()
    }
  }, [load, isLoaderExited])

  /*------------------------------
  Return values
  ------------------------------*/
  return [load, animationTrigger]
}

export default usePagePrecache
