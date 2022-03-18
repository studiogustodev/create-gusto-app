import { mainCacheAxios as axios } from '@/base/axios'
import { REQUEST_OPTIONS, RECEIVE_OPTIONS } from '@/actions/types'
import { API } from '@/constants'

const requestOptions = () => ({ type: REQUEST_OPTIONS })

const receiveOptions = (data) => ({
  type: RECEIVE_OPTIONS,
  payload: data,
})

const fetchOptions = () => async (dispatch, getState) => {
  dispatch(requestOptions())
  const response = await axios.get(`${API.STRINGS}?lang=${getState().locale.currentLanguage}`)
  dispatch(receiveOptions(response.data.acf))
}

export {
  fetchOptions,
}
