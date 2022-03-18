import { altAxios as axios } from '@/base/axios'
import {
  SET_USER_DATA,
  TOGGLE_AUDIO,
  REQUEST_VIDEO,
  RECEIVE_JOB_ID,
  REQUEST_VIDEO_STATUS,
  RECEIVE_VIDEO_STATUS,
  REQUEST_DOWNLOAD_VIDEO,
  RESET_EXPERIENCE,
  SET_UA_BROWSER,
  SET_UA_OS,
  SET_VIDEO_SUBMITTED,
} from '@/actions/types'
import { API, VIDEO_STORAGE } from '@/constants'
import { openLayer } from './layer'
import { changeLocation } from './fakerouter'

const setVideoSubmitted = () => ({ type: SET_VIDEO_SUBMITTED })

const setUABrowser = (data) => ({
  type: SET_UA_BROWSER,
  payload: data,
})

const setUAOS = (data) => ({
  type: SET_UA_OS,
  payload: data,
})

const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
})

const toggleAudio = (bool) => ({
  type: TOGGLE_AUDIO,
  payload: bool,
})

const requestVideo = () => ({ type: REQUEST_VIDEO })

const receiveJobId = (data) => ({
  type: RECEIVE_JOB_ID,
  payload: data,
})

const createVideo = (id, safe) => async (dispatch) => {
  dispatch(requestVideo())
  const response = await axios.post(`${API.CREATE_VIDEO}/${id}${safe ? '?p=safe' : ''}`)
  dispatch(receiveJobId(response.data))
}

const requestVideoStatus = () => ({ type: REQUEST_VIDEO_STATUS })

const receiveVideoStatus = (data) => ({
  type: RECEIVE_VIDEO_STATUS,
  payload: data,
})

const checkVideoStatus = () => async (dispatch, getState) => {
  dispatch(requestVideoStatus())
  const jobId = getState().user.job_id
  const response = await axios.get(`${API.VIDEO_STATUS}/${jobId}`)
  dispatch(receiveVideoStatus(response.data))
}

const requestDownloadVideo = () => ({ type: REQUEST_DOWNLOAD_VIDEO })

const getVideo = (qs) => async (dispatch, getState) => {
  dispatch(requestDownloadVideo())
  const { isBrowserInApp } = getState().user.ua.browser
  const isSafe = getState().user.ua.browser.name === 'Chrome' && getState().user.ua.os.name === 'iOS'
  const { job_id } = getState().user
  if (isBrowserInApp) return dispatch(openLayer({ id: 'in-app' }))
  if (isSafe) return `${VIDEO_STORAGE}/${job_id || qs}.mp4`
  if (qs && !isSafe) {
    return axios({
      method: 'get',
      url: `${API.CREATE_VIDEO}/${qs}`,
      responseType: 'blob',
    })
  }
  return axios({
    method: 'get',
    url: `${API.CREATE_VIDEO}/${job_id}`,
    responseType: 'blob',
  })
}

const requestReset = () => ({ type: RESET_EXPERIENCE })

const resetExperience = () => async (dispatch) => {
  dispatch(requestReset())
  dispatch(changeLocation('home'))
}

export {
  setUserData,
  toggleAudio,
  createVideo,
  checkVideoStatus,
  getVideo,
  resetExperience,
  setUABrowser,
  setUAOS,
  setVideoSubmitted,
}
