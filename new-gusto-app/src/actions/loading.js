import { SET_LOADING_VALUE } from '@/actions/types'

const setLoadingValue = (key, value) => ({
  type: SET_LOADING_VALUE,
  payload: value,
  key,
})

export {
  setLoadingValue,
}
