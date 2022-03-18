import { SET_LOADING_VALUE } from '@/actions/types'

const initialState = {
  isReady: false,
  isFirstLoad: true,
  isLoading: true,
  isSiteLoaded: false,
  isFontReady: false,
  isLoaderExited: false,
  isPageAnimationReady: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_VALUE:
      state = {
        ...state,
        [action.key]: action.payload,
      }
      break
    default:
      return { ...state }
  }
  return { ...state }
}
