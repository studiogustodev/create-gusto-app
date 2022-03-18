import { useEffect, useCallback } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import usePrevious from '@/hooks/usePrevious'
import * as loadingActions from '@/actions/loading'

const useChangePathname = () => {
  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const setIsLoading = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isLoading', bool)), [dispatch])
  const setReady = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isReady', bool)), [dispatch])
  const setFirstLoad = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isFirstLoad', bool)), [dispatch])
  const setPageAnimationReady = useCallback((bool) => dispatch(loadingActions.setLoadingValue('isPageAnimationReady', bool)), [dispatch])
  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { fakeLocation, isReady } = useSelector((state) => ({
    fakeLocation: state.fakerouter.location,
    isReady: state.loading.isReady,
  }), shallowEqual)

  /*------------------------------
  Manage Loading on change pathname
  ------------------------------*/
  const prevFakeLocation = usePrevious(fakeLocation)
  useEffect(() => {
    if (
      prevFakeLocation !== undefined
      && prevFakeLocation !== fakeLocation
    ) {
      setPageAnimationReady(false)
      setReady(false)
      setFirstLoad(false)
      setIsLoading(true)
    }
  }, [fakeLocation])

  /*------------------------------
  Remove Spinner
  ------------------------------*/
  useEffect(() => {
    if (isReady) setIsLoading(false)
  }, [isReady])

  return null
}

export default useChangePathname
