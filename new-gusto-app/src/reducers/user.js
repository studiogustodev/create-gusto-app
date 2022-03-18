import {
  SET_USER_DATA,
  SET_UA_BROWSER,
  SET_UA_OS,
  TOGGLE_AUDIO,
  RECEIVE_JOB_ID,
  RECEIVE_VIDEO_STATUS,
  RESET_EXPERIENCE,
  SET_VIDEO_SUBMITTED,
} from '@/actions/types'

const initialState = {
  ua: {
    browser: {},
    os: {},
  },
  muted: false,
  queue: 0,
  id: 10,
  done: false,
  submitted: false,
}

const IN_APP_BROWSER_LIST = ['Instagram', 'Twitter', 'Facebook']

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      state = {
        ...state,
        ...action.payload,
      }
      break
    case SET_UA_BROWSER:
      state = {
        ...state,
        ua: {
          ...state.ua,
          browser: {
            isBrowserInApp: IN_APP_BROWSER_LIST.includes(action.payload.name),
            ...action.payload,
          },
        },
      }
      break
    case SET_UA_OS:
      state = {
        ...state,
        ua: {
          ...state.ua,
          os: action.payload,
        },
      }
      break
    case TOGGLE_AUDIO:
      state = {
        ...state,
        muted: action.payload,
      }
      break
    case SET_VIDEO_SUBMITTED:
      state = {
        ...state,
        submitted: true,
      }
      break
    case RECEIVE_JOB_ID:
      state = {
        ...state,
        job_id: action.payload.job_id,
      }
      break
    case RECEIVE_VIDEO_STATUS:
      state = {
        ...state,
        ...action.payload,
        queue: action.payload.queue || 0,
        done: action.payload.done,
      }
      break
    case RESET_EXPERIENCE:
      state = {
        ...initialState,
        ua: state.ua,
      }
      break
    default:
      return { ...state }
  }
  return { ...state }
}
